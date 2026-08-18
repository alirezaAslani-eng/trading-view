import { useEffect, useEffectEvent, useState } from "react";
import { useRecordWebcam } from "react-record-webcam";

type UseKycL3VideoOptions = {
  onReadyKycVideo?: (file: File) => void | Promise<void>;
};

export function useKycL3Video({ onReadyKycVideo }: UseKycL3VideoOptions = {}) {
  const {
    activeRecordings,
    createRecording,
    openCamera: openCameraInternal,
    startRecording: startRecordingInternal,
    stopRecording: stopRecordingInternal,
    closeCamera: closeCameraInternal,
    getBlob,
    error,
    errorMessage,
    cameraPermission,
  } = useRecordWebcam();

  const [recordingId, setRecordingId] = useState<string | null>(null);
  const [recordedVideo, setRecordedVideo] = useState<File | null>(null);

  const recording = activeRecordings.find((item) => item.id === recordingId);

  const webcamRef = recording?.webcamRef ?? null;

  /**
   * --------------------------------------------------
   * OPEN CAMERA
   * --------------------------------------------------
   */
  const openCamera = useEffectEvent(async () => {
    try {
      let currentRecordingId = recordingId;

      if (!currentRecordingId) {
        const created = await createRecording();

        if (!created) {
          return;
        }

        currentRecordingId = created.id;
        setRecordingId(created.id);

        /**
         * اینجا عمداً فقط Recording را ایجاد می‌کنیم.
         *
         * چون webcamRef مربوط به Recording جدید
         * بعد از render بعدی در اختیار UI قرار می‌گیرد.
         */
        return;
      }

      await openCameraInternal(currentRecordingId);
    } catch (error) {
      console.error("KYC VIDEO: OPEN CAMERA ERROR", error);
    }
  });

  /**
   * وقتی Recording ساخته شد و recordingId داریم،
   * حالا می‌توانیم Camera را باز کنیم.
   */
  useEffect(() => {
    if (!recordingId) {
      return;
    }

    if (recording?.status === "INITIAL") {
      openCameraInternal(recordingId).catch((error) => {
        console.error("KYC VIDEO: OPEN CAMERA ERROR", error);
      });
    }
  }, [recordingId, recording?.status]);

  /**
   * --------------------------------------------------
   * START RECORDING
   * --------------------------------------------------
   */
  const startRecording = async () => {
    try {
      setRecordedVideo(null);

      let currentRecordingId = recordingId;

      if (!currentRecordingId || recording?.status === "STOPPED") {
        const created = await createRecording();

        if (!created) {
          return;
        }

        currentRecordingId = created.id;
        setRecordingId(created.id);

        await openCameraInternal(created.id);

        await startRecordingInternal(created.id);

        return;
      }

      await startRecordingInternal(currentRecordingId);
    } catch (error) {
      console.error("KYC VIDEO: START RECORDING ERROR", error);
    }
  };

  /**
   * --------------------------------------------------
   * STOP RECORDING
   * --------------------------------------------------
   *
   * این Action یعنی:
   *
   * "Recording تمام شده و ویدیو می‌تواند
   * به عنوان نتیجه معتبر مصرف شود."
   */
  const stopRecording = async () => {
    if (!recordingId) {
      return;
    }

    try {
      await stopRecordingInternal(recordingId);

      const blob = await getBlob(recordingId);

      if (!blob) {
        console.error("KYC VIDEO: RECORDED VIDEO BLOB NOT FOUND");
        return;
      }

      const file = new File([blob], `kyc-video-${Date.now()}.webm`, {
        type: blob.type || "video/webm",
      });

      setRecordedVideo(file);

      await onReadyKycVideo?.(file);
    } catch (error) {
      console.error("KYC VIDEO: STOP RECORDING ERROR", error);
    }
  };

  /**
   * --------------------------------------------------
   * CLOSE CAMERA
   * --------------------------------------------------
   *
   * این Action به معنی Cancel کردن فرآیند فعلی است.
   *
   * بنابراین:
   *
   * - Recording را در صورت نیاز متوقف می‌کنیم
   * - اما آن را به File تبدیل نمی‌کنیم
   * - onReadyKycVideo را صدا نمی‌زنیم
   * - recordedVideo را هم معتبر نگه نمی‌داریم
   */
  const closeCamera = async () => {
    if (!recordingId) {
      return;
    }

    try {
      if (recording?.status === "RECORDING" || recording?.status === "PAUSED") {
        /**
         * فقط Recording را متوقف می‌کنیم.
         *
         * اینجا نباید stopRecording() خودمان را صدا بزنیم،
         * چون آن تابع معنای "Video Ready" دارد.
         */
        await stopRecordingInternal(recordingId);
      }

      /**
       * ویدیوی قبلی دیگر معتبر نیست.
       */
      setRecordedVideo(null);

      /**
       * Camera را می‌بندیم.
       */
      await closeCameraInternal(recordingId);

      /**
       * Recording فعلی را هم از state خارج می‌کنیم
       * تا دفعه بعد یک Recording جدید ساخته شود.
       */
      setRecordingId(null);
    } catch (error) {
      console.error("KYC VIDEO: CLOSE CAMERA ERROR", error);
    }
  };

  /**
   * --------------------------------------------------
   * DERIVED STATE
   * --------------------------------------------------
   */

  const isCameraOpen =
    recording?.status === "OPEN" ||
    recording?.status === "RECORDING" ||
    recording?.status === "PAUSED" ||
    recording?.status === "STOPPED";

  const isRecording = recording?.status === "RECORDING";

  const isVideoReady = recordedVideo !== null;

  /**
   * --------------------------------------------------
   * CLEANUP
   * --------------------------------------------------
   */
  useEffect(() => {
    return () => {
      if (recordingId) {
        closeCameraInternal(recordingId);
      }
    };
  }, [recordingId]);

  return {
    recordedVideo,
    webcamRef,
    recording,

    isCameraOpen,
    isRecording,
    isVideoReady,

    openCamera,
    startRecording,
    stopRecording,
    closeCamera,

    cameraPermission,
    error,
    errorMessage,
  };
}
