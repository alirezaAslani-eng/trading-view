"use client";
import { Divider } from "@mui/material";
import BankTableList from "@/components/template/Profile/BankTableList";
import {
  PagePaper,
  PagePaperHeading,
  PagePaperTitle,
} from "@/components/ui/Layout/PaperLayout";

function page() {
  return (
    <PagePaper>
      <PagePaperHeading>
        <PagePaperTitle>{"اطلاعات بانکی"}</PagePaperTitle>
      </PagePaperHeading>
      <Divider sx={{ mt: "12px", mb: "32px", borderColor: "border.dark" }} />
      <BankTableList />
    </PagePaper>
  );
}

export default page;
