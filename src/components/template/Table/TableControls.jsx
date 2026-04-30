import InputText from "@/components/ui/Input/InputText";
import InputMarker from "@/components/ui/Marker/InputMarker";
import { Box } from "@mui/material";
import {
  InputSelect,
  InputSelectItem,
  InputSelectMenu,
} from "@/components/ui/Input/InputSelect";
import { SearchIcon } from "@/components/ui/Icon";

function TableControls() {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: "20px",
        width: "374px",
      }}
    >
      <Box sx={{ width: "42.7%" }}>
        <InputSelect placeholder="مرتب سازی" size="small" variant="outlined">
          <InputSelectMenu>
            <InputSelectItem value="1">متن تستی</InputSelectItem>
            <InputSelectItem value="2">متن تستی</InputSelectItem>
          </InputSelectMenu>
        </InputSelect>
      </Box>
      <Box sx={{ width: "51.88%" }}>
        <InputMarker
          right={"10px"}
          icon={<SearchIcon fontSize="medium" sx={{ color: "text.caption" }} />}
        >
          <InputText
            size={"small"}
            placeholder="جستجو..."
            sx={{ pr: "32px" }}
          />
        </InputMarker>
      </Box>
    </Box>
  );
}

export default TableControls;
