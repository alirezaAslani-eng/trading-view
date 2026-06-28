"use client";
import PageHeader from "@/components/common/Appbar/PageHeader";
import {
  AccordionDetails,
  AccordionSummary,
  Box,
  Dialog,
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
import { AddIcon, BoxOutlinedIcon } from "@/components/ui/Icon";
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
import { permissionGroupsConfig } from "@/packages/react-query";
import { useQuery } from "@tanstack/react-query";
import { ROUTES } from "@/constant/app/routes";
import { useState } from "react";
import AddGroupModal from "@/components/template/Modal/AddGroupModal";

function page() {
  return (
    <Page>
      <Header>
        <PageHeader title="سطوح دسترسی" subtitle="تعریف و ویرایش نمادها" />
      </Header>

      <Main sx={{ pb: "0px" }}>
        <Section>
          <SectionContent sx={{ gap: "32px" }}>
            <PermissionGroups />
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

function PermissionGroups() {
  const [open, setOpen] = useState(false);

  const query = useQuery(permissionGroupsConfig());

  return (
    <PageSubNavigation>
      <PagePaperHeading>
        <PagePaperTitle>نقش‌ها</PagePaperTitle>
      </PagePaperHeading>

      <Divider sx={{ mt: "12px", mb: "16px", borderColor: "border.dark" }} />

      {query.isLoading && <div>در حال بارگذاری...</div>}

      {query.data?.map((group) => (
        <PageSubNavigationLink
          key={group.id}
          href={ROUTES.PERMISSIONS.BYGROUP_ID(group.id)}
        >
          {group.description}
        </PageSubNavigationLink>
      ))}

      <Divider sx={{ mt: "4px", mb: "4px", borderColor: "border.dark" }} />

      <Button
        color="primary"
        variant="text"
        disableRipple
        sx={{ px: "14px", gap: "8px", justifyContent: "start" }}
        onClick={() => setOpen(true)}
      >
        <AddIcon sx={{ color: "inherit" }} />
        نقش جدید
      </Button>

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <AddGroupModal onClose={() => setOpen(false)} />
      </Dialog>
    </PageSubNavigation>
  );
}
