"use client";
// TODO : Modularize page's component, reduce imports and remove the "use client"
import { useState } from "react";
import Button from "@/components/ui/Button/Button";
import BouncCircleLoader from "@/components/ui/Fallback/BounceCircleLoader";
import FallbackHandler from "@/components/ui/Fallback/FallbackHandler";
import { AddIcon } from "@/components/ui/Icon";
import {
  PagePaper,
  PagePaperHeading,
  PagePaperTitle,
} from "@/components/ui/Layout/PaperLayout";
import ScrollContainer from "@/components/ui/ScrollContainer/ScrollContainer";
import {
  MY_COMPANY_ROLE,
  WorkspacesData,
} from "@/v2-architecture/src/features/kyc/api";
import {
  createCompanyConfig,
  switchWorkSpaceConfig,
  workspacesConfig,
} from "@/v2-architecture/src/features/kyc/react-query";
import {
  Box,
  Chip,
  Dialog,
  FormControl,
  Stack,
  Typography,
} from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";
import safeAsync from "@/utils/app/safeAsync";
import {
  ModalLayout,
  ModalLayoutBody,
  ModalLayoutCloseIcon,
  ModalLayoutHeading,
  ModalLayoutTitle,
} from "@/components/ui/Layout/ModalLayout";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createCompanyScheam,
  CreateCompanySchema,
} from "@/v2-architecture/src/features/kyc/validations";
import {
  FormLayout,
  FormLayoutField,
  FormLayoutLable,
  FormLayoutSubmit,
} from "@/components/ui/Layout/FormLayout";
import InputText from "@/components/ui/Input/InputText";
import NextLink from "@/components/ui/Link/NextLink";
import { ROUTES } from "@/constant/app/routes";

const roleContent = {
  [MY_COMPANY_ROLE.owner]: {
    label: "مالک",
    color: "primary",
  },
  [MY_COMPANY_ROLE.trader]: {
    label: "معامله‌گر",
    color: "default",
  },
} as const;

export default function page() {
  const [companyModal, setCompanyModal] = useState(false);

  //#region // * ------------ Workspaces Data ------------
  const { data, isLoading, isError } = useQuery(workspacesConfig());
  //#endregion

  //#region // * ------------ Switch Workspace ------------
  const switchMutation = useMutation(switchWorkSpaceConfig());

  const switchWorkspace = async (companyId: string) => {
    switchMutation.mutate({ companyId });
  };
  //#endregion

  return (
    <PagePaper>
      <PagePaperHeading sx={{ mb: "30px" }}>
        <PagePaperTitle>{"شرکت های من و کارفرمایان"}</PagePaperTitle>

        <Button
          variant="on-surface"
          sx={{ gap: "4px" }}
          onClick={() => setCompanyModal(true)}
        >
          <AddIcon />
          {"ایجاد شرکت"}
        </Button>
      </PagePaperHeading>
      {/* Custom Content */}
      <Box>
        <FallbackHandler
          isError={isError}
          isLoading={isLoading}
          dataLength={data?.length}
          fallbacks={{
            loader: <LoadingFallback />,
            noData: <NoDataFallback />,
          }}
        >
          <ScrollContainer sx={{ maxHeight: "500px", pl: "8px" }}>
            <Stack spacing={2}>
              {data?.map((workspace) => (
                <WorkspaceAccountItem
                  key={workspace.companyId}
                  workspace={workspace}
                  isSwitching={
                    switchMutation.isPending &&
                    switchMutation.variables?.companyId === workspace.companyId
                  }
                  onSwitch={() => switchWorkspace(workspace.companyId)}
                />
              ))}
            </Stack>
          </ScrollContainer>
        </FallbackHandler>

        <CreateCompanyModlaForm
          open={companyModal}
          onClose={() => setCompanyModal(false)}
        />
      </Box>
      {/* Custom Content */}
    </PagePaper>
  );
}

//#region // * ------------ Internal components ------------

type WorkspaceAccountItemProps = {
  workspace: WorkspacesData[number];
  isSwitching: boolean;
  onSwitch: () => void;
};

function WorkspaceAccountItem({
  workspace,
  isSwitching,
  onSwitch,
}: WorkspaceAccountItemProps) {
  const role = roleContent[workspace.myRole];

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "16px",
        p: "16px 20px",
        borderRadius: "12px",
        border: "1px solid",
        borderColor: "border.default",
        backgroundColor: "background.surfaceSecondary",
      }}
    >
      <Stack sx={{ gap: "6px" }}>
        <Stack direction="row" sx={{ alignItems: "center", gap: "8px" }}>
          <Typography variant="button1" sx={{ color: "text.heading" }}>
            {workspace.companyName}
          </Typography>

          <Chip
            label={role.label}
            size="small"
            color={role.color}
            sx={{ height: "22px" }}
          />
        </Stack>

        <Typography variant="body3" sx={{ color: "text.secondary" }}>
          {"شناسه ملی: "}
          {workspace.companyNationalId}
        </Typography>
      </Stack>

      <Stack direction="row" sx={{ alignItems: "center", gap: "8px" }}>
        {workspace.myRole === MY_COMPANY_ROLE.owner && (
          <NextLink href={ROUTES.COMPANIES.COMPANY_INFO(workspace.companyId)}>
            <Button variant="contained" size="small">
              {"مدیریت معامله گران"}
            </Button>
          </NextLink>
        )}

        <Button
          variant={workspace.isActive ? "contained" : "on-surface"}
          size="small"
          disabled={workspace.isActive || isSwitching}
          onClick={onSwitch}
          sx={{ gap: "6px" }}
        >
          {isSwitching && <BouncCircleLoader bounceSx={{ width: "6px" }} />}
          {!isSwitching && (workspace.isActive ? "فعال" : "سوییچ به این حساب")}
        </Button>
      </Stack>
    </Box>
  );
}

function NoDataFallback() {
  return (
    <Stack
      sx={{
        alignItems: "center",
        justifyContent: "center",
        height: "500px",
      }}
    >
      <Typography variant="button1" sx={{ color: "text.disabled" }}>
        {"شرکتی ثبت نشده"}
      </Typography>
    </Stack>
  );
}

function LoadingFallback() {
  return (
    <Stack
      sx={{
        alignItems: "center",
        justifyContent: "center",
        height: "400px",
      }}
    >
      <BouncCircleLoader />
    </Stack>
  );
}

type CreateCompanyModlaFormProps = {
  open: boolean;
  onClose: () => void;
};

function CreateCompanyModlaForm({
  open,
  onClose,
}: CreateCompanyModlaFormProps) {
  const form = useForm<CreateCompanySchema>({
    resolver: zodResolver(createCompanyScheam),
  });

  const mutation = useMutation(createCompanyConfig({ onSuccess: onClose }));

  const submitHandler = (fields: CreateCompanySchema) => {
    return safeAsync(() => mutation.mutateAsync(fields));
  };

  const companyNationalIdError =
    form.formState.errors.companyNationalId?.message;

  return (
    <Dialog open={open} onClose={onClose}>
      <ModalLayout onSubmit={form.handleSubmit(submitHandler)}>
        <ModalLayoutHeading>
          <ModalLayoutTitle
            title="ثبت شرکت جدید"
            subtitle="اطلاعات مورد نیاز شرکت را وارد کنید تا درخواست ثبت شرکت بررسی شود."
          />

          <ModalLayoutCloseIcon onClick={onClose} />
        </ModalLayoutHeading>

        <ModalLayoutBody>
          <FormControl disabled={form.formState.isSubmitting}>
            <FormLayout>
              <FormLayoutField>
                <FormLayoutLable>{"شناسه ملی"}</FormLayoutLable>

                <InputText
                  size="large"
                  placeholder="شناسه ملی شرکت را وارد کنید"
                  {...form.register("companyNationalId")}
                  error={!!companyNationalIdError}
                />
              </FormLayoutField>

              <FormLayoutSubmit>{"ثبت شرکت"}</FormLayoutSubmit>
            </FormLayout>
          </FormControl>
        </ModalLayoutBody>
      </ModalLayout>
    </Dialog>
  );
}
