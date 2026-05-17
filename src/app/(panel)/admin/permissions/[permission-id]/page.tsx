import PageHeader from "@/components/common/Appbar/PageHeader";
import NextLink from "@/components/ui/Link/NextLink";
import {
  AccordionDetails,
  AccordionSummary,
  Box,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import Accordion from "@/components/ui/Accordion/Accordion";
import {
  AccordionCheckboxItem,
  AccordionCheckboxLabel,
} from "@/components/ui/AccordionItem/AccordionCheckboxItem";
import CheckBox from "@/components/ui/Checkbox/CheckBox";
import {
  Header,
  Main,
  Page,
  Section,
  SectionContent,
} from "@/components/ui/Layout/PageLayout";
import {
  PagePaper,
  PagePaperHeading,
  PagePaperTitle,
} from "@/components/ui/Layout/PaperLayout";
import { AddIcon, BoxOutlinedIcon, HeadPhoneIcon } from "@/components/ui/Icon";
import {
  InputSelect,
  InputSelectItem,
  InputSelectMenu,
} from "@/components/ui/Input/InputSelect";
import {
  PageSubNavigation,
  PageSubNavigationLink,
} from "@/components/ui/PageSubNavigation/PageSubNavigation";
import Button from "@/components/ui/Button/Button";

function page() {
  return (
    <Page>
      <Header>
        <PageHeader title="سطوح دسترسی" subtitle="تعریف و ویرایش نمادها" />
      </Header>

      <Main sx={{ pb: "0px" }}>
        <Section>
          <SectionContent sx={{ gap: "32px" }}>
            <PageSubNavigation>
              <PagePaperHeading>
                <PagePaperTitle>{"نقش‌ ها"}</PagePaperTitle>
              </PagePaperHeading>

              <Divider
                sx={{ mt: "12px", mb: "16px", borderColor: "border.dark" }}
              />

              <PageSubNavigationLink href={"/admin/permissions/admin"}>
                <HeadPhoneIcon />
                {"پشتیبان"}
              </PageSubNavigationLink>
              <PageSubNavigationLink href={"/admin/permissions/admin1"}>
                <HeadPhoneIcon />
                {"پشتیبان"}
              </PageSubNavigationLink>
              <PageSubNavigationLink href={"/admin/permissions/admin2"}>
                <HeadPhoneIcon />
                {"پشتیبان"}
              </PageSubNavigationLink>
              <Divider
                sx={{ mt: "4px", mb: "4px", borderColor: "border.dark" }}
              />

              <Button
                color="primary"
                variant="text"
                disableRipple
                sx={{ px: "14px", gap: "8px", justifyContent: "start" }}
              >
                <AddIcon sx={{ color: "inherit" }} />
                {"نقش جدید"}
              </Button>
            </PageSubNavigation>
            <PermissionList />
          </SectionContent>
        </Section>
      </Main>
    </Page>
  );
}

export default page;

function PermissionList() {
  return (
    <PagePaper>
      <PagePaperHeading>
        <PagePaperTitle>{"لیست دسترسی‌ها"}</PagePaperTitle>

        <Box sx={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <Typography
            component={"label"}
            variant="body3"
            sx={{ color: "text.secondary" }}
          >
            {"نقش انتخابی:"}
          </Typography>
          <InputSelect
            sx={{ minWidth: "160px" }}
            size="small"
            variant="outlined"
            placeholder="نقش را انتخاب کنید"
            value="1"
          >
            <InputSelectMenu>
              <InputSelectItem value="1">{"ادمین"}</InputSelectItem>
              <InputSelectItem value="2">{"کاربر"}</InputSelectItem>
            </InputSelectMenu>
          </InputSelect>
        </Box>
      </PagePaperHeading>
      <Divider sx={{ borderColor: "border.dark", mt: "12px", mb: "16px" }} />

      <Stack sx={{ gap: "10px" }}>
        <Accordion variant={"contained"} size="large" accordionBorder>
          <AccordionSummary>
            <BoxOutlinedIcon />
            {"محصولات"}
          </AccordionSummary>

          <AccordionDetails>
            <AccordionCheckboxItem sx={{ px: "12px" }}>
              <AccordionCheckboxLabel sx={{ color: "text.primary2" }}>
                {"همه"}
              </AccordionCheckboxLabel>
              <CheckBox size="small" color="primary" variant="outlined" />
            </AccordionCheckboxItem>
          </AccordionDetails>
        </Accordion>
      </Stack>
    </PagePaper>
  );
}
