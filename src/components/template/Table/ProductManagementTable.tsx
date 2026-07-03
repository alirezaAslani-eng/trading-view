"use client";

import { productsConfig, productsDynamicKey } from "@/packages/react-query";
import ToggleTabGroup from "@/components/ui/ButtonGroup/ToggleTabGroup";
import AddIcon from "@/components/ui/Icon/AddIcon";
import FallbackHandler from "@/components/ui/Fallback/FallbackHandler";
import { useQuery } from "@tanstack/react-query";
import Button from "@/components/ui/Button/Button";
import { useState } from "react";
import { Dialog, Divider, ToggleButton } from "@mui/material";
import { AdminProduct, ProductStatus } from "@/api/types";
import { buildProductColumns } from "@/constant/features/product/productTableColumns";
import DataTable from "@/components/ui/Table/DataTable";
import AddProductModalForm from "../Form/AddProductModalForm";
import {
  PagePaper,
  PagePaperHeading,
} from "@/components/ui/Layout/PaperLayout";
import {
  TableFallback,
  TableFallbackData,
  TableFallbackLoader,
} from "@/components/ui/Fallback/TableFallback";

const queryConfig = productsConfig();

const adminProductsTable = buildProductColumns();

function ProductManagementTable() {
  const [status, setStatus] = useState<ProductStatus>("null");

  const statusHandler = (_: any, value: any) => {
    if (!!!value) return;
    setStatus(value);
  };

  const productsQuery = useQuery({
    ...queryConfig,
    queryKey: productsDynamicKey(status),
  });

  const dataLength = productsQuery.data?.length;

  return (
    <>
      <PagePaper>
        <PagePaperHeading sx={{ mb: "42px" }}>
          <ToggleTabGroup size="small" value={status} onChange={statusHandler}>
            <ToggleButton value={"null" satisfies ProductStatus}>
              {"همه"}
            </ToggleButton>
            <Divider orientation="vertical" flexItem />
            <ToggleButton value={"true" satisfies ProductStatus}>
              {"محصولات فعال"}
            </ToggleButton>
            <Divider orientation="vertical" flexItem />
            <ToggleButton value={"false" satisfies ProductStatus}>
              {"محصولات غیرفعال"}
            </ToggleButton>
          </ToggleTabGroup>
          <AddProductButton />
        </PagePaperHeading>

        <FallbackHandler
          isLoading={productsQuery.isLoading}
          isError={productsQuery.isError}
          dataLength={dataLength}
          fallbacks={{
            loader: (
              <TableFallback>
                <TableFallbackLoader columns={adminProductsTable} />
              </TableFallback>
            ),
            noData: (
              <TableFallback>
                <TableFallbackData />
              </TableFallback>
            ),
          }}
        />

        {!productsQuery.isLoading && !!dataLength && (
          <DataTable<AdminProduct>
            columns={adminProductsTable}
            rows={productsQuery.data}
          />
        )}
      </PagePaper>
    </>
  );
}

export default ProductManagementTable;

function AddProductButton() {
  const [isOpenModal, setIsOPenModal] = useState(false);
  const closeHandler = () => setIsOPenModal(false);
  const openHandler = () => setIsOPenModal(true);
  return (
    <>
      <Button
        variant="contained"
        size="medium"
        onClick={openHandler}
        sx={{ gap: "6px", borderRadius: "14px" }}
      >
        <AddIcon sx={{ color: "inherit" }} />
        {"محصول جدید"}
      </Button>

      <Dialog open={isOpenModal} onClose={closeHandler}>
        <AddProductModalForm onClose={closeHandler} />
      </Dialog>
    </>
  );
}
