"use client";

import TableControls from "@/components/template/Table/TableControls";
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
} from "@mui/material";
import {
  PagePaper,
  PagePaperHeading,
  PagePaperTitle,
} from "@/components/ui/Layout/PaperLayout";

function AssetCartTable() {
  return (
    <PagePaper>
      <PagePaperHeading sx={{ mb: "40px" }}>
        <PagePaperTitle>{"سبد دارایی‌های فولادی"}</PagePaperTitle>
        <TableControls />
      </PagePaperHeading>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>{"نماد"}</TableCell>

            <TableCell>{"مقدار"}</TableCell>

            <TableCell>{"قبمت میانگین خرید"}</TableCell>

            <TableCell>{"قیمت لحظه‌ای"}</TableCell>

            <TableCell>{"ارزش فعلی"}</TableCell>

            <TableCell>{"سود/ضرر"}</TableCell>

            <TableCell sx={{ textAlign: "center !important" }}>
              {"عملیات"}
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          <TableRow>
            <TableCell>{"میلگرد ۱۴ ذوب آهن اصفهان "}</TableCell>
            <TableCell>{"۱۲.۵ تن"}</TableCell>
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
            <TableCell>{"میلگرد ۱۴ ذوب آهن اصفهان "}</TableCell>
            <TableCell>{"۱۲.۵ تن"}</TableCell>
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
            <TableCell>{"میلگرد ۱۴ ذوب آهن اصفهان "}</TableCell>
            <TableCell>{"۱۲.۵ تن"}</TableCell>
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
            <TableCell>{"میلگرد ۱۴ ذوب آهن اصفهان "}</TableCell>
            <TableCell>{"۱۲.۵ تن"}</TableCell>
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

export default AssetCartTable;
