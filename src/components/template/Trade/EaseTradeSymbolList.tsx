"use client";
import { SearchIcon } from "@/components/ui/Icon";
import InputText from "@/components/ui/Input/InputText";
import InputMarker from "@/components/ui/Marker/InputMarker";
import ScrollContainer from "@/components/ui/ScrollContainer/ScrollContainer";
import { Stack } from "@mui/material";
import SymbolItem from "@/components/ui/ListItem/SymbolItem";

function EaseTradeSymbolList() {
  // TODO fetch symbols
  // TODO implements searching logic
  // TODO conect this section to useForm
  return (
    <Stack spacing={5}>
      <InputMarker
        right="10px"
        icon={<SearchIcon fontSize="medium" sx={{ color: "text.caption" }} />}
      >
        <InputText size="small" placeholder="جستجو..." sx={{ pr: "32px" }} />
      </InputMarker>

      <ScrollContainer sx={{ maxHeight: "364px", pl: "4px", mt: "20px" }}>
        <Stack spacing={1}>
          <SymbolItem />
          <SymbolItem />
          <SymbolItem />
        </Stack>
      </ScrollContainer>
    </Stack>
  );
}

export default EaseTradeSymbolList;
