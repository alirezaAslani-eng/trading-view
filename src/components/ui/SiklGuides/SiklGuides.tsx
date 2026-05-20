import { alpha, Box, Stack, Typography } from "@mui/material";
import { CircleIcon } from "../Icon";
import { SiklGuide } from "@/constant/features/types";

interface SiklGuidesProps {
  title: string;
  guides?: Partial<SiklGuide>[];
}
function SiklGuides({ title, guides }: SiklGuidesProps) {
  return (
    <Box
      sx={({ palette }) => ({
        border: "1px solid",
        borderColor: alpha(palette.border.white, 0.18),
        borderRadius: "6px",
        padding: "8px",
        color: "text.secondary",
      })}
    >
      <Typography variant="body2" sx={{ color: "inherit" }}>
        {title}
      </Typography>
      <Stack sx={{ mt: "20px" }}>
        {!!guides?.length &&
          guides.map(({ guid }) => {
            return (
              <Box sx={{ display: "flex", gap: "6px" }} key={guid}>
                <CircleIcon sx={{ width: "4px", height: "4px", mt: "10px" }} />
                <Typography variant="body2" sx={{ color: "inherit" }}>
                  {guid}
                </Typography>
              </Box>
            );
          })}
      </Stack>
    </Box>
  );
}

export default SiklGuides;
