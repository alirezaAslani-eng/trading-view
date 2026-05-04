import ButtonTableAction from "@/components/ui/Button/ButtonTableAction";
import Table from "@/components/ui/Table/Table";
import {
  TableLayout,
  TableLayoutHeading,
  TableLayoutTitle,
} from "@/components/ui/Layout/TableLayout";
import {
  Box,
  TableCell,
  TableBody,
  TableHead,
  TableRow,
  Typography,
  ToggleButtonGroup,
  ToggleButton,
} from "@mui/material";
import {
  PagePaper,
  PagePaperHeading,
  PagePaperTitle,
} from "@/components/ui/Layout/PaperLayout";
function OpenBuysTable() {
  return (
    <PagePaper>
      <PagePaperHeading sx={{ mb: "14px" }}>
        <PagePaperTitle>{"سبد دارایی‌های فولادی"}</PagePaperTitle>
        <ToggleButtonGroup color="success" value={"1"} sx={{ width: "216px" }}>
          <ToggleButton value={"1"}>{"سفارشات خرید"}</ToggleButton>
          <ToggleButton value={"2"}>{"سفارشات فروش"}</ToggleButton>
        </ToggleButtonGroup>
      </PagePaperHeading>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>{"نماد"}</TableCell>

            <TableCell>{"مقدار"}</TableCell>

            <TableCell>{"قبمت میانگین خرید"}</TableCell>

            <TableCell>{"قیمت لحظه‌ای"}</TableCell>

            <TableCell sx={{ textAlign: "center !important" }}>
              {"عملیات"}
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          <TableRow>
            <TableCell>{"۲۷,۱۰۰  تومان"}</TableCell>
            <TableCell>{"۲۷,۱۰۰  تومان"}</TableCell>
            <TableCell>{"۳۳۸,۷۵۰,۰۰۰  تومان"}</TableCell>
            <TableCell>
              <Typography variant="caption1" sx={{ color: "text.profit" }}>
                {"۲.۶ %"}
              </Typography>
            </TableCell>
            <TableCell>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                }}
              >
                <ButtonTableAction>{"خرید"}</ButtonTableAction>
                <ButtonTableAction>{"فروش"}</ButtonTableAction>
              </Box>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>{"۲۶,۴۰۰  تومان"}</TableCell>
            <TableCell>{"۲۷,۱۰۰  تومان"}</TableCell>
            <TableCell>{"۳۳۸,۷۵۰,۰۰۰  تومان"}</TableCell>
            <TableCell>
              <Typography variant="caption1" sx={{ color: "text.profit" }}>
                {"۲.۶ %"}
              </Typography>
            </TableCell>
            <TableCell>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                }}
              >
                <ButtonTableAction>{"خرید"}</ButtonTableAction>
                <ButtonTableAction>{"فروش"}</ButtonTableAction>
              </Box>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>{"۲۶,۴۰۰  تومان"}</TableCell>
            <TableCell>{"۲۷,۱۰۰  تومان"}</TableCell>
            <TableCell>{"۳۳۸,۷۵۰,۰۰۰  تومان"}</TableCell>
            <TableCell>
              <Typography variant="caption1" sx={{ color: "text.profit" }}>
                {"۲.۶ %"}
              </Typography>
            </TableCell>
            <TableCell>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                }}
              >
                <ButtonTableAction>{"خرید"}</ButtonTableAction>
                <ButtonTableAction>{"فروش"}</ButtonTableAction>
              </Box>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>{"۲۶,۴۰۰  تومان"}</TableCell>
            <TableCell>{"۲۷,۱۰۰  تومان"}</TableCell>
            <TableCell>{"۳۳۸,۷۵۰,۰۰۰  تومان"}</TableCell>
            <TableCell>
              <Typography variant="caption1" sx={{ color: "text.profit" }}>
                {"۲.۶ %"}
              </Typography>
            </TableCell>
            <TableCell>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                }}
              >
                <ButtonTableAction>{"خرید"}</ButtonTableAction>
                <ButtonTableAction>{"فروش"}</ButtonTableAction>
              </Box>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </PagePaper>
  );
}

export default OpenBuysTable;
