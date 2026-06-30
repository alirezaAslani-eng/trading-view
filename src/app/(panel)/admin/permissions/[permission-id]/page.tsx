"use client";
import PageHeader from "@/components/common/Appbar/PageHeader";
import {
  AccordionDetails,
  AccordionSummary,
  Box,
  CircularProgress,
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
import {
  assignPermissionsConfig,
  permissionChecklistConfig,
  permissionGroupsConfig,
} from "@/packages/react-query";
import { useQuery } from "@tanstack/react-query";
import { ROUTES } from "@/constant/app/routes";
import { useEffect, useState } from "react";
import AddGroupModal from "@/components/template/Modal/AddGroupModal";
import { useParams } from "next/navigation";
import { useMutation } from "@tanstack/react-query";

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
  const params = useParams();

  const groupId = params["permission-id"] as string;

  const query = useQuery(permissionChecklistConfig(groupId));

  const [selectedPermissions, setSelectedPermissions] = useState<number[]>([]);
  const [loadingPermissionId, setLoadingPermissionId] = useState<number | null>(
    null,
  );
  const mutation = useMutation(assignPermissionsConfig());
  useEffect(() => {
    if (query.data) {
      const ids = query.data.categories
        .flatMap((category) => category.permissions)
        .filter((permission) => permission.isAssigned)
        .map((permission) => permission.id);

      setSelectedPermissions(ids);
    }
  }, [query.data]);
  const handlePermissionChange = (permissionId: number, checked: boolean) => {
    let newPermissions: number[];

    if (checked) {
      newPermissions = [...selectedPermissions, permissionId];
    } else {
      newPermissions = selectedPermissions.filter((id) => id !== permissionId);
    }

    setSelectedPermissions(newPermissions);

    setLoadingPermissionId(permissionId);

    mutation.mutate(
      {
        groupId: Number(groupId),
        permissionIds: newPermissions,
      },
      {
        onSettled: () => {
          setLoadingPermissionId(null);
        },
      },
    );
  };
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

      <Stack
        sx={{
          gap: "10px",
        }}
      >
        {query.data?.categories?.map((category) => (
          <Accordion
            key={category.categoryId}
            variant="contained"
            size="large"
            accordionBorder
          >
            <AccordionSummary>
              <BoxOutlinedIcon />
              {category.caption}
            </AccordionSummary>
            <AccordionDetails>
              {category.permissions.map((permission) => (
                <AccordionCheckboxItem
                  key={permission.id}
                  sx={{
                    px: "12px",
                  }}
                >
                  <AccordionCheckboxLabel
                    sx={{
                      color: "text.onPrimary",
                    }}
                  >
                    {permission.displayName}
                  </AccordionCheckboxLabel>
                  {loadingPermissionId === permission.id ? (
                    <CircularProgress size={16} />
                  ) : (
                    <CheckBox
                      size="small"
                      color="primary"
                      variant="outlined"
                      checked={selectedPermissions.includes(permission.id)}
                      onChange={(event) => {
                        handlePermissionChange(
                          permission.id,
                          event.target.checked,
                        );
                      }}
                    />
                  )}
                </AccordionCheckboxItem>
              ))}
            </AccordionDetails>
          </Accordion>
        ))}
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
