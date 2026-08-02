"use client";
import { useParams, useRouter } from "next/navigation";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useCallback, useState } from "react";
import {
  Box,
  Chip,
  Dialog,
  FormControl,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "@/components/ui/Button/Button";
import FallbackHandler from "@/components/ui/Fallback/FallbackHandler";
import ScrollContainer from "@/components/ui/ScrollContainer/ScrollContainer";
import {
  CompanyMembersData,
  MY_COMPANY_ROLE,
  WorkspacesData,
} from "@/v2-architecture/src/features/kyc/api";
import { AddIcon, ArrowRightIcon, DeleteIcon } from "@/components/ui/Icon";
import {
  addCompanyMemberConfig,
  companyMembersConfig,
  removeCompanyMemberConfig,
  workspacesConfig,
} from "@/v2-architecture/src/features/kyc/react-query";
import {
  PagePaper,
  PagePaperHeading,
  PagePaperTitle,
} from "@/components/ui/Layout/PaperLayout";
import {
  ModalLayout,
  ModalLayoutBody,
  ModalLayoutCloseIcon,
  ModalLayoutHeading,
  ModalLayoutTitle,
} from "@/components/ui/Layout/ModalLayout";
import {
  FormLayout,
  FormLayoutField,
  FormLayoutFieldError,
  FormLayoutLable,
  FormLayoutSubmit,
} from "@/components/ui/Layout/FormLayout";
import InputText from "@/components/ui/Input/InputText";
import safeAsync from "@/utils/app/safeAsync";
import {
  AddCompanyMemberSchema,
  addCompanyMemberSchema,
} from "@/validations/kyc/addCompanyMemberSchema";
import NiceModal from "@ebay/nice-modal-react";
import { GenericConfirmDialog } from "@/packages/nice-modal-react";
import { convertToJalali } from "@/packages/dayjs";
import { JALALI_FORMAT } from "@/constant/app/date";

function CompanyMembersPage() {
  const params = useParams();
  const router = useRouter();
  const companyId = params["company-id"] as string;

  //#region // * ------------ Members Data------------
  const company = useGetCompanyInfo(companyId);
  const { data, isLoading, isError } = useQuery(
    companyMembersConfig(companyId),
  );
  //#endregion // * ------------ Members Data------------

  //#region // * ------------ Members Mutation ------------
  const removeMutation = useMutation(removeCompanyMemberConfig());

  const removeHandler = useCallback(
    async (employeeId: string) => {
      const result = await NiceModal.show(GenericConfirmDialog, {
        color: "error",
      });
      if (!!result) removeMutation.mutate({ employeeId, companyId });
    },
    [companyId],
  );
  //#endregion // * ------------ Members Mutation ------------

  //#region // * ------------ Add Member Modal ------------
  const [addMemberModal, setAddMemberModal] = useState(false);
  //#endregion // * ------------ Add Member Modal ------------

  return (
    <PagePaper>
      <PagePaperHeading sx={{ mb: "30px" }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <Button variant="text" size="small" onClick={router.back}>
            <ArrowRightIcon sx={{ color: "inherit" }} />
            {"برگشت"}
          </Button>
          <PagePaperTitle>
            {company?.companyName ? (
              `معامله گران ${company.companyName}`
            ) : (
              <Skeleton variant="text" sx={{ width: "200px" }} />
            )}
          </PagePaperTitle>
        </Box>
        <Button variant="on-surface" onClick={() => setAddMemberModal(true)}>
          <AddIcon />
          {"معامله گر جدید"}
        </Button>
      </PagePaperHeading>

      <Box>
        <FallbackHandler
          isError={isError}
          isLoading={isLoading}
          fallbacks={{
            loader: <LoadingFallback />,
            noData: <NoDataFallback />,
          }}
        >
          <ScrollContainer sx={{ maxHeight: "500px", pl: "8px" }}>
            <Stack spacing={2}>
              {data?.map((member) => (
                <CompanyMemberItem
                  key={member.employeeId}
                  member={member}
                  onRemove={removeHandler}
                  isRemoving={
                    removeMutation.isPending &&
                    removeMutation.variables.employeeId === member.employeeId
                  }
                />
              ))}
            </Stack>
          </ScrollContainer>
        </FallbackHandler>
      </Box>

      <AddCompanyMemberModalForm
        open={addMemberModal}
        onClose={() => setAddMemberModal(false)}
        companyId={companyId}
      />
    </PagePaper>
  );
}

export default CompanyMembersPage;

function useGetCompanyInfo(
  companyId: string,
): WorkspacesData[number] | undefined {
  const { data: workspaces } = useQuery(workspacesConfig());
  const company = workspaces?.find((w) => w.companyId === companyId);
  return company;
}

//#region // * ------------ Internal components ------------
type AddCompanyMemberModalFormProps = {
  open: boolean;
  onClose: () => void;
  companyId: string;
};

function AddCompanyMemberModalForm({
  open,
  onClose,
  companyId,
}: AddCompanyMemberModalFormProps) {
  const form = useForm({
    resolver: zodResolver(addCompanyMemberSchema),
    defaultValues: {
      companyId,
      memberPhone: "",
    },
  });

  const mutation = useMutation(
    addCompanyMemberConfig({
      onSuccess() {
        onClose();
        form.reset();
      },
    }),
  );

  const submitHandler = (fields: AddCompanyMemberSchema) => {
    return safeAsync(() => mutation.mutateAsync(fields));
  };

  const memberPhoneError = form.formState.errors.memberPhone?.message;

  return (
    <Dialog open={open} onClose={onClose}>
      <ModalLayout onSubmit={form.handleSubmit(submitHandler)}>
        <ModalLayoutHeading>
          <ModalLayoutTitle
            title="افزودن معامله گر جدید"
            subtitle="شماره تماس معامله‌گر مورد نظر را وارد کنید."
          />
          <ModalLayoutCloseIcon onClick={onClose} />
        </ModalLayoutHeading>

        <ModalLayoutBody>
          <FormControl disabled={form.formState.isSubmitting}>
            <FormLayout>
              <FormLayoutField>
                <FormLayoutLable>{"شماره تماس"}</FormLayoutLable>
                <InputText
                  size="large"
                  placeholder="شماره تماس معامله‌گر را وارد کنید"
                  {...form.register("memberPhone")}
                  error={!!memberPhoneError}
                />
                <FormLayoutFieldError message={memberPhoneError} />
              </FormLayoutField>

              <FormLayoutSubmit>{"افزودن معامله گر"}</FormLayoutSubmit>
            </FormLayout>
          </FormControl>
        </ModalLayoutBody>
      </ModalLayout>
    </Dialog>
  );
}

const roleContent = {
  [MY_COMPANY_ROLE.owner]: { label: "مالک", color: "primary" },
  [MY_COMPANY_ROLE.trader]: { label: "معامله‌گر", color: "default" },
} as const;

type CompanyMemberItemProps = {
  member: CompanyMembersData[number];
  isRemoving: boolean;
  onRemove: (employeeId: string) => void;
};

function CompanyMemberItem({
  member,
  isRemoving,
  onRemove,
}: CompanyMemberItemProps) {
  const role = roleContent[member.role];

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
            {member.fullName}
          </Typography>
          <Chip
            label={role.label}
            size="small"
            color={role.color}
            sx={{ height: "22px" }}
          />
        </Stack>

        <Typography variant="body3" sx={{ color: "text.secondary" }}>
          {"شماره تلفن: "}
          {member.phoneNumber}
        </Typography>

        <Typography variant="body3" sx={{ color: "text.secondary" }}>
          {"تاریخ عضویت: "}
          {convertToJalali(member.joinedAt).format(JALALI_FORMAT)}
        </Typography>
      </Stack>

      <Button
        color="error"
        variant="outlined"
        size="small"
        disabled={isRemoving}
        onClick={() => onRemove(member.employeeId)}
      >
        <DeleteIcon sx={{ color: "inherit" }} />
        {isRemoving ? "در حال حذف..." : "حذف معامله گر"}
      </Button>
    </Box>
  );
}

function NoDataFallback() {
  return (
    <Stack
      sx={{ alignItems: "center", justifyContent: "center", height: "400px" }}
    >
      <Typography variant="button1" sx={{ color: "text.disabled" }}>
        {"معامله گرانی ثبت نشده"}
      </Typography>
    </Stack>
  );
}

function LoadingFallback() {
  return (
    <Stack
      sx={{ alignItems: "center", justifyContent: "center", height: "400px" }}
    >
      <Typography variant="button1" sx={{ color: "text.disabled" }}>
        {"در حال بارگذاری..."}
      </Typography>
    </Stack>
  );
}
//#endregion // * ------------ Internal components ------------
