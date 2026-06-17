import { Divider } from "@mui/material";
import ProfileOverviewSection from "@/components/template/Profile/ProfileOverviewSection";

import {
  PagePaper,
  PagePaperHeading,
  PagePaperTitle,
} from "@/components/ui/Layout/PaperLayout";

function page() {
  return (
    <PagePaper>
      <PagePaperHeading>
        <PagePaperTitle>{"مشخصات کاربری"}</PagePaperTitle>
      </PagePaperHeading>
      <Divider sx={{ mt: "12px", mb: "32px", borderColor: "border.dark" }} />
      <ProfileOverviewSection />
    </PagePaper>
  );
}

export default page;
