"use client";
import FallbackHandler from "@/components/ui/Fallback/FallbackHandler";
import { useQuery } from "@tanstack/react-query";
import { productsConfig } from "@/packages/react-query";
import { SxProps, Theme } from "@mui/material";
import {
  InputSelect,
  InputSelectItem,
  InputSelectMenu,
} from "@/components/ui/Input/InputSelect";
import {
  SelectInputLoader,
  SelectInputLoaderText,
} from "@/components/ui/Fallback/SelectInputLoader";
import { ComponentProps } from "react";

const inputSelect_sx: SxProps<Theme> = ({ typography }) => ({
  fontSize: typography.button1.fontSize,
  width: "188px",
  height: "51px",
  "&.Mui-placeholder": {
    fontSize: typography.button1.fontSize,
  },
  "& .MuiSvgIcon-root": {
    width: "18px",
    height: "18px",
  },
});
const queryConfig = productsConfig();

function InputSelectProduct(props: ComponentProps<typeof InputSelect>) {
  const query = useQuery(queryConfig);
  const isSuccessQuery = query.status === "success";

  return (
    <>
      <InputSelect
        variant="outlined"
        sx={inputSelect_sx}
        placeholder="نماد"
        {...props}
      >
        <InputSelectMenu>
          <FallbackHandler
            isLoading={query.isLoading}
            isError={query.isError}
            fallbacks={{
              loader: (
                <SelectInputLoader>
                  <SelectInputLoaderText />
                </SelectInputLoader>
              ),
            }}
          />

          {isSuccessQuery &&
            query.data.map((product) => {
              return (
                <InputSelectItem key={product.id} value={product.productCode}>
                  {product.productName}
                </InputSelectItem>
              );
            })}
        </InputSelectMenu>
      </InputSelect>
    </>
  );
}

export default InputSelectProduct;
