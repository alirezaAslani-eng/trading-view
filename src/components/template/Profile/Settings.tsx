import KycPassedSteps from "@/components/template/kyc/KycPassedSteps";
import CustomizedSwitches from "@/components/ui/Switch/Switch";
import {
    Box, Divider, Stack, ToggleButton, Typography, TableCell,
    TableBody,
    TableHead,
    TableRow,
    Switch,
} from "@mui/material";

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
                <CustomizedSwitches />
            </Box>
        </Stack>
    );
}

export default Settings;
