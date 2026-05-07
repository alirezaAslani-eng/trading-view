import ToggleTabGroup from "@/components/ui/ButtonGroup/ToggleTabGroup";
import Table from "@/components/ui/Table/Table";
import AddIcon from "@/components/ui/Icon/AddIcon";
import StatusBadge from "@/components/ui/Status/StatusBadge";
import CircleIcon from "@/components/ui/Icon/CircleIcon";
import { PenOnPaperIcon, TrashIcon } from "@/components/ui/Icon";
import ScrollContainer from "@/components/ui/ScrollContainer/ScrollContainer";
import {
  PagePaper,
  PagePaperHeading,
} from "@/components/ui/Layout/PaperLayout";
import {
  Box,
  Button,
  Divider,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  ToggleButton,
  Typography,
} from "@mui/material";
function ProductsTable() {
  return (
    <PagePaper>
      <PagePaperHeading sx={{ mb: "42px" }}>
        <ToggleTabGroup value={"1"} size="small">
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
          <AddIcon sx={{color:"inherit"}}/>
          {"محصول جدید"}
        </Button>
      </PagePaperHeading>

      <ScrollContainer
        overflowedSx={{ pb: "20px", pl: "20px" }}
        sx={{ maxHeight: "250px" }}
      >
        <Table sx={{ width: "100%" }}>
          <TableHead>
            <TableRow>
              <TableCell>{"نماد"}</TableCell>
              <TableCell>{"کد محصول"}</TableCell>
              <TableCell>{"دسته بندی"}</TableCell>
              <TableCell>{"واحد"}</TableCell>
              <TableCell>{"تاریخ ایجاد"}</TableCell>
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
            <TableRow>
              <TableCell>{"میلگرد"}</TableCell>
              <TableCell>{"REB"}</TableCell>
              <TableCell>{"محصولات لوله‌ای"}</TableCell>
              <TableCell>{"کیلوگرم"}</TableCell>
              <TableCell>{"1405/01/10"}</TableCell>
              <TableCell>
                <StatusBadge color="warning" size="medium">
                  <CircleIcon />
                  {"درحال انتظار"}
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
          </TableBody>
        </Table>
      </ScrollContainer>
    </PagePaper>
  );
}

export default ProductsTable;
