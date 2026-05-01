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

function AssetCartTable() {
  return (
    <TableLayout>
      <TableLayoutHeading>
        <TableLayoutTitle>{"سبد دارایی‌های فولادی"}</TableLayoutTitle>
        <TableControls />
      </TableLayoutHeading>

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
    </TableLayout>
  );
}

export default AssetCartTable;
