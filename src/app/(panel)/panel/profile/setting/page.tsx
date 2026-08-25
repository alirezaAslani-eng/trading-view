import { AccountSetting } from "@/v2-architecture/src/features/user";
import {
  PagePaper,
  PagePaperHeading,
  PagePaperTitle,
} from "@/components/ui/Layout/PaperLayout";

export default function page() {
  return (
    <PagePaper>
      <PagePaperHeading sx={{ mb: 4 }}>
        <PagePaperTitle>تنظیمات حساب</PagePaperTitle>
      </PagePaperHeading>

      <AccountSetting />
    </PagePaper>
  );
}
