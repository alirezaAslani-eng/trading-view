import { alpha, Box } from "@mui/material";
import NextImage from "../Image/NextImage";
import { notDefinedColors } from "@/packages/mui/theme/shades";

function AuthPageBackground() {
  return (
    <>
      <NextImage
        src={"/images/auth-mountain.webp"}
        alt="hero image"
        width={}
        sizes="100vh"
        priority
        quality={100}
        sx={{ zIndex: -2, objectFit: "cover" }}
      />
      {/* // * ------- gradient effect ------- */}
      {/* <Box
        sx={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          zIndex: -1,
          opacity: { xs: 1, sm: 0.48 },
          backdropFilter: { xs: "blur(60px)", sm: "blur(0)" },
          background: {
            xs: alpha(notDefinedColors["#121212"], 0.02),
            sm: "linear-gradient(to bottom, #252525, #1B1B1B)",
          },
        }}
      /> */}
    </>
  );
}

export default AuthPageBackground;
