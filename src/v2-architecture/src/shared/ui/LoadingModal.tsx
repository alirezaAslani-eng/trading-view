import { Dialog, LinearProgress, Stack, Typography } from "@mui/material";

import {
  ModalLayout,
  ModalLayoutBody,
  ModalLayoutHeading,
  ModalLayoutTitle,
} from "@/components/ui/Layout/ModalLayout";

type LoadingModalProps = {
  open: boolean;
  title?: string;
  subtitle?: string;
  message?: string;
};

const contentSx = {
  alignItems: "center",
  py: 2,
};

const messageSx = {
  color: "text.secondary",
};

const progressSx = {
  width: "100%",
  height: 6,
  borderRadius: 3,
};

export function LoadingModal({
  open,
  title = "لطفاً منتظر بمانید",
  subtitle = "در حال انجام عملیات هستیم.",
  message = "لطفاً تا پایان عملیات منتظر بمانید.",
}: LoadingModalProps) {
  return (
    <Dialog open={open} fullWidth maxWidth="xs">
      <ModalLayout>
        <ModalLayoutHeading>
          <ModalLayoutTitle title={title} subtitle={subtitle} />
        </ModalLayoutHeading>

        <ModalLayoutBody>
          <Stack spacing={3} sx={contentSx}>
            <Typography variant="body2" align="center" sx={messageSx}>
              {message}
            </Typography>

            <LinearProgress sx={progressSx} />
          </Stack>
        </ModalLayoutBody>
      </ModalLayout>
    </Dialog>
  );
}
