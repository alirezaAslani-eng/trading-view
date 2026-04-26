"use client";
import { Box, styled } from "@mui/material";
import NextImage from "../Image/NextImage";
// import Image from "next/image";

const imageSize = 32;

const StyledProfileCircle = styled(Box)(({ theme }) => ({
  width: `${imageSize}px`,
  height: `${imageSize}px`,
  borderRadius: "999px",
  backgroundColor: theme.palette.background.surfaceSecondary,
}));

/**
 * @param {React.ComponentProps<typeof StyledProfileCircle> & {src:string}} param0
 */
function ProfileCircle({ src, ...props }) {
  return (
    <StyledProfileCircle {...props}>
      <NextImage
        src={src}
        alt="profile"
        width={imageSize}
        height={imageSize}
        sx={{ objectFit: "cover" }}
      />
    </StyledProfileCircle>
  );
}

export default ProfileCircle;
