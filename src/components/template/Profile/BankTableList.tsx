import {
  Box,
  Divider,
  Stack,
  ToggleButton,
  TableCell,
  TableBody,
  TableHead,
  TableRow,
  Dialog,
} from "@mui/material";
import { AddIcon, TrashIcon } from "@/components/ui/Icon";
import ToggleTabGroup from "@/components/ui/ButtonGroup/ToggleTabGroup";
import Button from "@/components/ui/Button/Button";
import Table from "@/components/ui/Table/Table";
import StatusBadge from "@/components/ui/Status/StatusBadge";
import { useState } from "react";
import {
  ModalLayout,
  ModalLayoutBody,
  ModalLayoutCloseIcon,
  ModalLayoutHeading,
  ModalLayoutTitle,
} from "@/components/ui/Layout/ModalLayout";
import AddCreditCardForm from "@/components/template/Form/AddCreditCardForm";
import AddShabaForm from "@/components/template/Form/AddShabaForm";
import { useMutation, useQuery } from "@tanstack/react-query";
import { bankAccountsConfig, deleteBankConfig } from "@/packages/react-query";

const mutationConfig = deleteBankConfig();
const queryConfig = bankAccountsConfig();

type ModalState = "iban" | "bank" | null;
type TabState = "banks" | "Ibans";

// ! Issiue : Some data dosen't come from server like `nationalId` and `birthdate`
function BankInfoOverviewSection() {
  const banksQuery = useQuery(queryConfig);
  const { mutate: deleteMutation } = useMutation(mutationConfig);

  const [modalState, setModalState] = useState<ModalState>();
  const [selectedTab, setSelectedTab] = useState<TabState>("banks");

  const handleDelete = (id: number) => {
    deleteMutation(id);
  };

  const formatCardNumber = (cardNumber: string) => {
    return cardNumber.replace(/(\d{4})(?=\d)/g, "$1-");
  };

  const handleTabChange = (
    ـ: React.MouseEvent<HTMLElement>,
    newValue: string | null,
  ) => {
    if (!newValue) return;
    setSelectedTab(newValue as TabState);
  };

  const cardNumber = selectedTab === "banks" ? "cardNumber" : "iban";

  const modalOpener =
    selectedTab === "Ibans"
      ? () => setModalState("iban")
      : () => setModalState("bank");

  const isLoading =
    banksQuery.status === "error" || banksQuery.status === "pending";
  const isEmptyData = !!!banksQuery.data?.length;

  return (
    <>
      <Stack>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          {/* // * ----start---- Tabs -------- */}
          <ToggleTabGroup
            value={selectedTab}
            size="small"
            onChange={handleTabChange}
          >
            <ToggleButton value={"banks" satisfies TabState}>
              {"شماره کارت"}
            </ToggleButton>
            <Divider orientation="vertical" flexItem />
            <ToggleButton value={"Ibans" satisfies TabState}>
              {"شماره حساب"}
            </ToggleButton>
          </ToggleTabGroup>
          {/* // * ----end---- Tabs -------- */}
        </Box>

        <>
          {/* // * ---start--- BankList -------- */}
          {!isLoading && (
            <>
              {!isEmptyData && (
                <>
                  <Box sx={{ mt: "40px" }}>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>{"بانک"}</TableCell>

                          <TableCell>{"شماره کارت"}</TableCell>

                          <TableCell>{"وضعیت"}</TableCell>

                          <TableCell sx={{ textAlign: "center !important" }}>
                            {"عملیات"}
                          </TableCell>
                        </TableRow>
                      </TableHead>

                      <TableBody>
                        {banksQuery.data.map((account) => (
                          <TableRow key={account.id}>
                            <TableCell>{account.bankName}</TableCell>
                            <TableCell>
                              {formatCardNumber(account[cardNumber])}
                            </TableCell>
                            <TableCell>
                              <StatusBadge
                                color={
                                  account.isVerified ? "success" : "warning"
                                }
                              >
                                {account.isVerified
                                  ? "تایید شده"
                                  : "در حال بررسی"}
                              </StatusBadge>
                            </TableCell>
                            <TableCell
                              sx={{ display: "flex", justifyContent: "center" }}
                            >
                              <Box
                                sx={{ cursor: "pointer" }}
                                onClick={() => handleDelete(account.id)}
                              >
                                <TrashIcon />
                              </Box>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </Box>

                  <Divider
                    sx={{ mt: "40px", mb: "20px", borderColor: "border.dark" }}
                  />
                </>
              )}
            </>
          )}

          <Button
            onClick={modalOpener}
            sx={{ mx: "auto", mt: isEmptyData ? "40px" : 0 }}
            variant="on-surface"
          >
            <AddIcon /> &nbsp;{" "}
            {selectedTab === "banks" ? "افزودن کارت" : "افزودن شباه"}
          </Button>
        </>
      </Stack>

      <Dialog open={modalState === "bank"} onClose={() => setModalState(null)}>
        <ModalLayout>
          <ModalLayoutHeading>
            <ModalLayoutTitle title="افزودن کارت" subtitle="" />
            <ModalLayoutCloseIcon onClick={() => setModalState(null)} />
          </ModalLayoutHeading>
          <ModalLayoutBody>
            <AddCreditCardForm />
          </ModalLayoutBody>
        </ModalLayout>
      </Dialog>

      <Dialog open={modalState === "iban"} onClose={() => setModalState(null)}>
        <ModalLayout>
          <ModalLayoutHeading>
            <ModalLayoutTitle title="افزودن شبا" subtitle="" />
            <ModalLayoutCloseIcon onClick={() => setModalState(null)} />
          </ModalLayoutHeading>
          <ModalLayoutBody>
            <AddShabaForm />
          </ModalLayoutBody>
        </ModalLayout>
      </Dialog>
    </>
  );
}

export default BankInfoOverviewSection;
