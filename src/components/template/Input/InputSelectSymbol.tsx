"use client";
import FallbackHandler from "@/components/ui/Fallback/FallbackHandler";
import { useQuery } from "@tanstack/react-query";
import { symbolsConfig } from "@/packages/react-query";
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


const queryConfig = symbolsConfig();

function InputSelectSymbol(props: ComponentProps<typeof InputSelect>) {
  const query = useQuery(queryConfig);

  return (
    <>
      <InputSelect
        variant="outlined"
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

          {query.data?.map((symbol) => {
            return (
              <InputSelectItem key={symbol.name} value={symbol.name}>
                {symbol.description}
              </InputSelectItem>
            );
          })}
        </InputSelectMenu>
      </InputSelect>
    </>
  );
}

export default InputSelectSymbol;
