"use client";

import { ReplaceSxWithSxOnlyObject } from "@/packages/mui/theme/types";
import { Stack, StackProps } from "@mui/material";

export default function DialogAction(
    props: ReplaceSxWithSxOnlyObject<StackProps>
) {
    return (
        <Stack
            {...props}
            className="ConfirmDialog-action"
            spacing={4}
            sx={{
                width: "100%",
                mt: "32px",
                ...props.sx,
            }}
        >
            {props.children}
        </Stack>
    );
}
