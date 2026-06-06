"use client";

import { productsConfig } from "@/packages/react-query";
import { ProductItem } from "@/api/types";
import ToggleTabGroup from "@/components/ui/ButtonGroup/ToggleTabGroup";
import Table from "@/components/ui/Table/Table";
import AddIcon from "@/components/ui/Icon/AddIcon";
import StatusBadge from "@/components/ui/Status/StatusBadge";
import CircleIcon from "@/components/ui/Icon/CircleIcon";
import { PenOnPaperIcon, TrashIcon } from "@/components/ui/Icon";
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
import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Button from "@/components/ui/Button/Button";
const queryConfig = productsConfig();

function getProductStatusValue(product: ProductItem) {
  return product.ProductStatusId ?? product.productStatusId;
}

function isProductActive(product: ProductItem) {
  const statusValue = getProductStatusValue(product);

  if (typeof statusValue === "boolean") {
    return statusValue;
  }

  return statusValue === 1;
}

function getProductStatusMeta(product: ProductItem) {
  if (isProductActive(product)) {
    return { label: "فعال", color: "success" as const };
  }

  return { label: "غیرفعال", color: "error" as const };
}

function ProductsTable() {
  const productsQuery = useQuery(queryConfig);
  const [selectedTab, setSelectedTab] = useState("1");
  const products = productsQuery.data ?? [];

  const filteredProducts = useMemo(() => {
    if (selectedTab === "2") {
      return products.filter(isProductActive);
    }

    if (selectedTab === "3") {
      return products.filter((product) => !isProductActive(product));
    }

    return products;
  }, [products, selectedTab]);

  const isLoading = productsQuery.status === "pending";
  const isError = productsQuery.status === "error";

  return (
    <PagePaper>
      <PagePaperHeading sx={{ mb: "42px" }}>
        <ToggleTabGroup
          value={selectedTab}
          size="small"
          exclusive
          onChange={(_, value) => {
            if (value) {
              setSelectedTab(value);
            }
          }}
        >
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
          {!isLoading && !isError && filteredProducts.length ? (
            filteredProducts.map((product) => {
              const statusMeta = getProductStatusMeta(product);

              return (
                <TableRow key={product.Id}>
                  <TableCell>{product.ProductName}</TableCell>
                  <TableCell>{product.ProductCode}</TableCell>
                  <TableCell>{product.CategoryId}</TableCell>
                  <TableCell>{product.UnitOfMeasure}</TableCell>
                  <TableCell>
                    <StatusBadge color={statusMeta.color} size="medium">
                      <CircleIcon />
                      {statusMeta.label}
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
            })
          ) : (
            <TableRow>
              <TableCell colSpan={6}>
                <Typography
                  variant="body3"
                  sx={{ color: "text.caption", textAlign: "center", py: 2 }}
                >
                  {isError
                    ? "هیچ محصولی یافت نشد"
                    : isLoading
                    ? "در حال دریافت محصولات"
                    : "محصولی برای نمایش وجود ندارد"}
                </Typography>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </PagePaper>
  );
}

export default ProductsTable;
