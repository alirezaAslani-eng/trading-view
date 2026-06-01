import { AddIcon, TrashIcon } from "@/components/ui/Icon";
import ToggleTabGroup from "@/components/ui/ButtonGroup/ToggleTabGroup";
import Button from "@/components/ui/Button/Button";
import Table from "@/components/ui/Table/Table";
import StatusBadge from "@/components/ui/Status/StatusBadge";
import {
  Box,
  Divider,
  Stack,
  ToggleButton,
  TableCell,
  TableBody,
  TableHead,
  TableRow,
} from "@mui/material";

// ! Issiue : Some data dosen't come from server like `nationalId` and `birthdate`
async function BankInfoOverviewSection() {
  return (
    <Stack>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* // * ----start---- Tabs -------- */}
        <ToggleTabGroup value={"1"} size="small">
          <ToggleButton value={"1"}>{"شماره کارت"}</ToggleButton>
          <Divider orientation="vertical" flexItem />
          <ToggleButton value={"2"}>{"شماره حساب"}</ToggleButton>
          <Divider orientation="vertical" flexItem />
          <ToggleButton value={"3"}>{"قرارداد واریز مستقیم"}</ToggleButton>
        </ToggleTabGroup>
        {/* // * ----end---- Tabs -------- */}
      </Box>

      {/* // * ---start--- BankList -------- */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: "18px",
          mt: "32px",
        }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>{"بانک"}</TableCell>

              <TableCell>{"شماره کارت"}</TableCell>

              <TableCell>{"وضعیت"}</TableCell>

              <TableCell sx={{ textAlign: "center !important" }}>
                {"عملیات"}
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            <TableRow>
              <TableCell>{"سامان"}</TableCell>
              <TableCell>{"6219-1256-0420-1012"}</TableCell>
              <TableCell>
                <StatusBadge color="success">{"تایید شده"}</StatusBadge>
              </TableCell>
              <TableCell sx={{ display: "flex", justifyContent: "center" }}>
                <TrashIcon />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>{"ایران زمین"}</TableCell>
              <TableCell>{"6219-8619-5486-9780"}</TableCell>
              <TableCell>
                <StatusBadge color="warning">{"در حال بررسی"}</StatusBadge>
              </TableCell>
              <TableCell sx={{ display: "flex", justifyContent: "center" }}>
                <TrashIcon />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Box>
      <Divider sx={{ mt: "40px", mb: "20px", borderColor: "border.dark" }} />
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          my: "20px",
        }}
      >
        <Button variant="on-surface">
          {" "}
          <AddIcon /> &nbsp; {"افزودن کارت"}
        </Button>
      </Box>
    </Stack>
  );
}

export default BankInfoOverviewSection;
