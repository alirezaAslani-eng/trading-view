"use client";
import FallbackHandler from "@/components/ui/Fallback/FallbackHandler";
import {
  SelectInputLoader,
  SelectInputLoaderText,
} from "@/components/ui/Fallback/SelectInputLoader";
import {
  InputSelect,
  InputSelectItem,
  InputSelectMenu,
} from "@/components/ui/Input/InputSelect";
import { productCategoriesConfig } from "@/packages/react-query";
import { useQuery } from "@tanstack/react-query";
import { ComponentProps } from "react";

const queryConfig = productCategoriesConfig();
function InputSelectProductCategory(props: ComponentProps<typeof InputSelect>) {
  const query = useQuery(queryConfig);
  const isSuccessQuery = query.status === "success";
  return (
    <InputSelect {...props}>
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
          query.data.map((category) => {
            return (
              <InputSelectItem key={category.id} value={category.id}>
                {category.name}
              </InputSelectItem>
            );
          })}
      </InputSelectMenu>
    </InputSelect>
  );
}

export default InputSelectProductCategory;
