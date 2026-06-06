"use client";

import { productsConfig } from "@/packages/react-query";
import ToggleTabGroup from "@/components/ui/ButtonGroup/ToggleTabGroup";
import Table from "@/components/ui/Table/Table";
import AddIcon from "@/components/ui/Icon/AddIcon";
import StatusBadge from "@/components/ui/Status/StatusBadge";
import CircleIcon from "@/components/ui/Icon/CircleIcon";
import { PenOnPaperIcon, TrashIcon } from "@/components/ui/Icon";
import FallbackHandler from "@/components/ui/Fallback/FallbackHandler";
import { useQuery } from "@tanstack/react-query";
import Button from "@/components/ui/Button/Button";
import {
  PagePaper,
  PagePaperHeading,
} from "@/components/ui/Layout/PaperLayout";
import {
  Box,
  Divider,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  ToggleButton,
  Typography,
} from "@mui/material";
import {
  TableFallback,
  TableFallbackData,
  TableFallbackLoader,
} from "@/components/ui/Fallback/TableFallback";

const queryConfig = productsConfig();
function ProductsTable() {
  const productsQuery = useQuery(queryConfig);
  const isSuccessQuery = productsQuery.status === "success";

  return (
    <PagePaper>
      <PagePaperHeading sx={{ mb: "42px" }}>
        <ToggleTabGroup size="small">
          <ToggleButton value={"1"}>{"همه"}</ToggleButton>
          <Divider orientation="vertical" flexItem />
          <ToggleButton value={"2"}>{"محصولات فعال"}</ToggleButton>
          <Divider orientation="vertical" flexItem />
          <ToggleButton value={"3"}>{"محصولات غیرفعال"}</ToggleButton>
        </ToggleTabGroup>

        <Button
          variant="contained"
          size="medium"
          sx={{ gap: "6px", borderRadius: "14px" }}
        >
          <AddIcon sx={{ color: "inherit" }} />
          {"محصول جدید"}
        </Button>
      </PagePaperHeading>
      <TableFallback>
        <FallbackHandler
          isLoading={productsQuery.isLoading}
          isError={productsQuery.isError}
          dataLength={productsQuery.data?.length}
          fallbacks={{
            noData: <TableFallbackData />,
            loader: <TableFallbackLoader />,
          }}
        />
      </TableFallback>

      {isSuccessQuery && (
        <Table sx={{ width: "100%" }}>
          <TableHead>
            <TableRow>
              <TableCell>{"نماد"}</TableCell>
              <TableCell>{"کد محصول"}</TableCell>
              <TableCell>{"دسته بندی"}</TableCell>
              <TableCell>{"واحد"}</TableCell>
              <TableCell>{"وضعیت"}</TableCell>
              <TableCell>
                <Typography
                  variant="body3"
                  sx={{ color: "text.caption", textAlign: "center" }}
                >
                  {"عملیات"}
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {productsQuery.data.map((product) => {
              return (
                <TableRow key={product.id}>
                  <TableCell>{product.productName}</TableCell>
                  <TableCell>{product.productCode}</TableCell>
                  <TableCell>{product.categoryId}</TableCell>
                  <TableCell>{product.unitOfMeasure}</TableCell>
                  <TableCell>
                    <StatusBadge color={"disabled"} size="medium">
                      <CircleIcon />
                      {product.productStatusId}
                    </StatusBadge>
                  </TableCell>
                  <TableCell>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "12px",
                      }}
                    >
                      <PenOnPaperIcon sx={{ cursor: "pointer" }} />
                      <TrashIcon sx={{ cursor: "pointer" }} />
                    </Box>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      )}
    </PagePaper>
  );
}

export default ProductsTable;
