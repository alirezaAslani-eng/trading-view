import { useState } from "react";
import { Box, Stack, Typography } from "@mui/material";
import { ModalFormProps } from "@/components/template/Form/types";
import {
  ModalLayout,
  ModalLayoutBody,
  ModalLayoutCloseIcon,
  ModalLayoutHeading,
  ModalLayoutTitle,
} from "@/components/ui/Layout/ModalLayout";
import Button from "@/components/ui/Button/Button";
import { KycL3FaceDetectionModal } from "./KycL3FaceDetectionModal";
import { kycL3Config } from "../react-query";
import { useMutation } from "@tanstack/react-query";

type KycL3Step = "requirements" | "recording";

function KycL3ModalForm({ onClose }: ModalFormProps) {
  const [step, setStep] = useState<KycL3Step>("requirements");
  const mutation = useMutation(kycL3Config());

  const requirements = [
    "در محیطی با نور کافی و یکنواخت قرار بگیرید و از قرار گرفتن نور شدید پشت سر خودداری کنید.",
    "صورت شما باید کاملاً داخل کادر دوربین قرار داشته باشد و به‌وضوح قابل مشاهده باشد.",
    "در هنگام احراز از ماسک، عینک آفتابی، کلاه یا مواردی که مانع تشخیص واضح چهره می‌شوند استفاده نکنید.",
    "هنگام ضبط ویدیو ثابت بمانید و از حرکت یا چرخاندن شدید سر خودداری کنید.",
    "از اتصال پایدار اینترنت در طول فرآیند احراز اطمینان حاصل کنید.",
    "دسترسی دوربین و میکروفون دستگاه باید در طول فرآیند فعال باشد.",
    "ویدیو باید توسط خود شما و در همان لحظه فرآیند احراز ضبط شود.",
  ];

  const handleStartVerification = () => {
    setStep("recording");
  };

  const handleRecordingClose = () => {
    setStep("requirements");
  };

  const handleReadyFile = (file: File) => {
    mutation.mutate({ video: file });
  };

  return (
    <ModalLayout>
      <ModalLayoutHeading>
        <ModalLayoutTitle
          title="احراز سطح ۳"
          subtitle={
            step === "requirements"
              ? "قبل از شروع، موارد زیر را رعایت کنید"
              : "ویدیوی احراز خود را ضبط کنید"
          }
        />

        <ModalLayoutCloseIcon onClick={onClose} />
      </ModalLayoutHeading>

      <ModalLayoutBody>
        {step === "requirements" && (
          <Stack spacing={3}>
            <Typography
              variant="body2"
              sx={{
                color: "text.secondary",
              }}
            >
              برای اینکه فرآیند احراز با موفقیت انجام شود، لطفاً قبل از شروع
              موارد زیر را بررسی کنید.
            </Typography>

            <Stack
              component="ul"
              spacing={1.5}
              sx={{
                m: 0,
                pr: 2.5,
                pl: 0,
              }}
            >
              {requirements.map((requirement, index) => (
                <Box
                  component="li"
                  key={index}
                  sx={{
                    pl: 0.75,
                  }}
                >
                  <Typography
                    variant="body2"
                    sx={{
                      color: "text.secondary",
                      lineHeight: 1.8,
                    }}
                  >
                    {requirement}
                  </Typography>
                </Box>
              ))}
            </Stack>

            <Button
              fullWidth
              variant="on-surface"
              size="large"
              onClick={handleStartVerification}
            >
              شروع احراز
            </Button>
          </Stack>
        )}

        <KycL3FaceDetectionModal
          open={step === "recording"}
          onClose={handleRecordingClose}
        />
      </ModalLayoutBody>
    </ModalLayout>
  );
}

export default KycL3ModalForm;
