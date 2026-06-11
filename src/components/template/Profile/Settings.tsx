import { Box, Stack, Switch } from "@mui/material";

// ! Issiue : Some data dosen't come from server like `nationalId` and `birthdate`
async function Settings() {
  return (
    <Stack>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: "18px",
          mt: "32px",
        }}
      >
        <Switch />
      </Box>
    </Stack>
  );
}

export default Settings;
