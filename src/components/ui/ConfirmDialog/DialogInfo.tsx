"use client";
import { Stack, Typography } from "@mui/material";

interface Props {
    title: string;
    description?: string;
}

export default function DialogInfo({ title, description }: Props) {
    return (
        <Stack spacing={1.5} sx={{ textAlign: "center", mt: "32px" }}>
            <Typography variant="h6" sx={{ color: "text.onPrimary" }}>
                {title}
            </Typography>

            {description && (
                <Typography variant="button2" sx={{ color: "text.caption" }}>
                    {description}
                </Typography>
            )}
        </Stack>
    );
}
