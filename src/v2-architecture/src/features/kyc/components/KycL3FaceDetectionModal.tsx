"use client";

import { useEffect, useRef, useState } from "react";
import { Box, Dialog, LinearProgress, Stack, Typography } from "@mui/material";
import { useMutation } from "@tanstack/react-query";

import {
  ModalLayout,
  ModalLayoutBody,
  ModalLayoutCloseIcon,
  ModalLayoutHeading,
  ModalLayoutTitle,
} from "@/components/ui/Layout/ModalLayout";

import { kycL3Config } from "../react-query";
import { useKycL3Video } from "../hooks";
import { LoadingModal } from "@/v2-architecture/src/shared/ui";

const COUNTDOWN_SECONDS = 3;
const RECORDING_DURATION = 10;

type KycL3FaceDetectionModalProps = {
  open: boolean;
  onClose: () => void;
};

function KycL3FaceDetectionModal({
  open,
  onClose,
}: KycL3FaceDetectionModalProps) {
  const [countdown, setCountdown] = useState<number | null>(null);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  const hasStartedRecordingRef = useRef(false);
  const hasStoppedRecordingRef = useRef(false);

  const {
    webcamRef,
    isCameraOpen,
    isRecording,
    openCamera,
    startRecording,
    stopRecording,
    closeCamera,
    cameraPermission,
    errorMessage,
  } = useKycL3Video({
    onReadyKycVideo: handleReadyFile,
  });

  const mutation = useMutation({
    ...kycL3Config(),

    onSuccess: onClose,

    onError: async () => {
      setElapsedSeconds(0);
      setCountdown(null);

      hasStartedRecordingRef.current = false;
      hasStoppedRecordingRef.current = false;

      await openCamera();

      setCountdown(COUNTDOWN_SECONDS);
    },
  });

  /*
   * Start camera when dialog opens
   */
  useEffect(() => {
    if (!open) return;

    const initializeCamera = async () => {
      try {
        await openCamera();

        setCountdown(COUNTDOWN_SECONDS);
        setElapsedSeconds(0);

        hasStartedRecordingRef.current = false;
        hasStoppedRecordingRef.current = false;
      } catch {
        // Camera error is handled by the hook.
      }
    };

    initializeCamera();
  }, [open]);

  /*
   * Countdown
   */
  useEffect(() => {
    if (countdown === null || countdown <= 0) return;

    const timer = window.setTimeout(() => {
      setCountdown((current) => {
        if (current === null) return null;

        return current - 1;
      });
    }, 1000);

    return () => {
      window.clearTimeout(timer);
    };
  }, [countdown]);

  /*
   * Start recording after countdown
   */
  useEffect(() => {
    if (countdown !== 0) return;
    if (hasStartedRecordingRef.current) return;

    hasStartedRecordingRef.current = true;

    startRecording();
    setCountdown(null);
  }, [countdown, startRecording]);

  /*
   * Recording timer
   */
  useEffect(() => {
    if (!isRecording) return;

    const timer = window.setInterval(() => {
      setElapsedSeconds((current) => {
        const next = current + 1;

        if (next >= RECORDING_DURATION && !hasStoppedRecordingRef.current) {
          hasStoppedRecordingRef.current = true;

          stopRecording();
        }

        return Math.min(next, RECORDING_DURATION);
      });
    }, 1000);

    return () => {
      window.clearInterval(timer);
    };
  }, [isRecording, stopRecording]);

  /*
   * Video is ready
   */
  function handleReadyFile(file: File) {
    closeCamera();

    mutation.mutate({
      video: file,
    });
  }

  /*
   * Close recording dialog
   */
  const handleClose = () => {
    if (mutation.isPending) return;

    closeCamera();
    onClose();
  };

  const progress = (elapsedSeconds / RECORDING_DURATION) * 100;

  return (
    <>
      {/* Recording Dialog */}
      <Dialog
        open={open && !mutation.isPending}
        onClose={handleClose}
        fullWidth
        maxWidth="sm"
      >
        <ModalLayout>
          <ModalLayoutHeading>
            <ModalLayoutTitle
              title="ضبط ویدیوی احراز"
              subtitle="در طول ضبط، صورت خود را داخل کادر نگه دارید."
            />

            <ModalLayoutCloseIcon onClick={handleClose} />
          </ModalLayoutHeading>

          <ModalLayoutBody>
            <Stack spacing={3}>
              {/* Camera */}
              <Box
                sx={{
                  width: "100%",
                  aspectRatio: "16 / 9",
                  overflow: "hidden",
                  borderRadius: 2,
                  backgroundColor: "background.surfaceLevel4",
                  position: "relative",
                }}
              >
                <video
                  ref={webcamRef}
                  autoPlay
                  muted
                  playsInline
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />

                {/* Countdown */}
                {countdown !== null && countdown > 0 && (
                  <Box
                    sx={{
                      position: "absolute",
                      inset: 0,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: "rgba(0, 0, 0, 0.35)",
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: 72,
                        fontFamily: "var(--iranyekan-demibold)",
                        color: "white",
                      }}
                    >
                      {countdown}
                    </Typography>
                  </Box>
                )}

                {/* Camera loading */}
                {!isCameraOpen && countdown === null && (
                  <Box
                    sx={{
                      position: "absolute",
                      inset: 0,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Typography variant="body2">
                      در حال آماده‌سازی دوربین...
                    </Typography>
                  </Box>
                )}
              </Box>

              {/* Recording progress */}
              {isRecording && (
                <Stack spacing={1}>
                  <Stack
                    sx={{
                      direction: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Typography variant="body3">در حال ضبط</Typography>

                    <Typography
                      variant="body3"
                      sx={{
                        direction: "ltr",
                      }}
                    >
                      {elapsedSeconds} / {RECORDING_DURATION} ثانیه
                    </Typography>
                  </Stack>

                  <LinearProgress
                    variant="determinate"
                    value={progress}
                    sx={{
                      height: 6,
                      borderRadius: 3,
                    }}
                  />
                </Stack>
              )}

              {/* Countdown message */}
              {countdown !== null && countdown > 0 && (
                <Typography
                  variant="body2"
                  align="center"
                  sx={{
                    color: "text.secondary",
                  }}
                >
                  ضبط ویدیو تا چند لحظه دیگر شروع می‌شود...
                </Typography>
              )}

              {/* Camera error */}
              {errorMessage && (
                <Typography
                  variant="body3"
                  sx={{
                    color: "text.error",
                  }}
                >
                  {errorMessage}
                </Typography>
              )}

              {/* Camera permission */}
              {cameraPermission === "denied" && (
                <Typography
                  variant="body3"
                  sx={{
                    color: "text.error",
                  }}
                >
                  دسترسی به دوربین و میکروفون داده نشده است.
                </Typography>
              )}
            </Stack>
          </ModalLayoutBody>
        </ModalLayout>
      </Dialog>

      {/* Upload Pending Dialog */}
      <LoadingModal
        open={mutation.isPending}
        title="در حال ارسال ویدیو"
        subtitle="لطفاً تا پایان ارسال ویدیو منتظر بمانید."
        message="ویدیوی شما در حال ارسال برای بررسی است."
      />
    </>
  );
}

export { KycL3FaceDetectionModal };
