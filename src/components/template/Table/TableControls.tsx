import InputText from "@/components/ui/Input/InputText";
import InputMarker from "@/components/ui/Marker/InputMarker";
import { SearchIcon } from "@/components/ui/Icon";
import { ChangeEvent } from "react";

interface TableControlsProps {
  value?: string;
  onChange?: (value: string) => void;
}

function TableControls({ value, onChange }: TableControlsProps) {
  return (
    <InputMarker
      right={"10px"}
      icon={<SearchIcon fontSize="medium" sx={{ color: "text.caption" }} />}
    >
      <InputText
        size={"small"}
        placeholder="جستجو نماد"
        value={value}
        onChange={(event: ChangeEvent<HTMLInputElement>) =>
          onChange?.(event.target.value)
        }
        sx={{ width: "194px", pr: "32px" }}
      />
    </InputMarker>
    // <Box
    //   sx={{
    //     display: "flex",
    //     alignItems: "center",
    //     gap: "20px",
    //     width: "374px",
    //   }}
    // >
    /* <Box sx={{ width: "42.7%" }}>
        <InputSelect placeholder="مرتب سازی" size="small" variant="outlined">
          <InputSelectMenu>
            <InputSelectItem value="1">متن تستی</InputSelectItem>
            <InputSelectItem value="2">متن تستی</InputSelectItem>
          </InputSelectMenu>
        </InputSelect>
      </Box> */
    // <Box sx={{  }}>

    // </Box>
    // </Box>
  );
}

export default TableControls;
