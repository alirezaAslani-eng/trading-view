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
import { AddIcon } from "@/components/ui/Icon";
import ToggleTabGroup from "@/components/ui/ButtonGroup/ToggleTabGroup";
import Button from "@/components/ui/Button/Button";
import Table from "@/components/ui/Table/Table";
import StatusBadge from "@/components/ui/Status/StatusBadge";
import { useState } from "react";
import AddCreditCardModalForm from "@/components/template/Form/AddCreditCardModalForm";
import AddShabaModalForm from "@/components/template/Form/AddShabaModalForm";
import { useQuery } from "@tanstack/react-query";
import { bankAccountsConfig } from "@/packages/react-query";
import FallbackHandler from "@/components/ui/Fallback/FallbackHandler";
import {
  ModalLayout,
  ModalLayoutBody,
  ModalLayoutCloseIcon,
  ModalLayoutHeading,
  ModalLayoutTitle,
} from "@/components/ui/Layout/ModalLayout";
import {
  TableFallback,
  TableFallbackData,
  TableFallbackLoader,
} from "@/components/ui/Fallback/TableFallback";

const queryConfig = bankAccountsConfig();

const formatCardNumber = (cardNumber: string) => {
  return cardNumber.replace(/(\d{4})(?=\d)/g, "$1-");
};

type ModalState = "iban" | "bank" | null;
type TabState = "banks" | "Ibans";

function BankTableList() {
  const banksQuery = useQuery(queryConfig);

  const [modalState, setModalState] = useState<ModalState>();
  const [selectedTab, setSelectedTab] = useState<TabState>("Ibans");

  const handleTabChange = (ـ: any, newValue: string | null) => {
    if (!newValue) return;
    setSelectedTab(newValue as TabState);
  };

  const cardNumber = selectedTab === "banks" ? "cardNumber" : "iban";

  const modalOpener =
    selectedTab === "Ibans"
      ? () => setModalState("iban")
      : () => setModalState("bank");

  const isVisibleData =
    banksQuery.status === "success" && !!banksQuery.data.length;
  return (
    <>
      <Stack>
        <Box>
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

        <FallbackHandler
          isLoading={banksQuery.isLoading}
          isError={banksQuery.isError}
          dataLength={banksQuery.data?.length}
          fallbacks={{
            loader: (
              <TableFallback>
                <TableFallbackLoader />
              </TableFallback>
            ),
            noData: (
              <TableFallback>
                <TableFallbackData />
              </TableFallback>
            ),
          }}
        />

        <>
          {/* // * ---start--- BankList -------- */}
          {isVisibleData && (
            <>
              <Box sx={{ mt: "40px" }}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>{"بانک"}</TableCell>
                      <TableCell>{"شماره کارت"}</TableCell>
                      <TableCell>{"وضعیت"}</TableCell>{" "}
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {banksQuery.data.map((account) => (
                      <TableRow key={account.id}>
                        <TableCell>{account.bankName}</TableCell>
                        <TableCell>
                          {!account?.[cardNumber] && "شماره کارت ثبت نشده"}

                          {!!account?.[cardNumber] &&
                            formatCardNumber(account[cardNumber])}
                        </TableCell>
                        <TableCell>
                          <StatusBadge
                            color={account.isVerified ? "success" : "warning"}
                          >
                            {account.isVerified ? "تایید شده" : "در حال بررسی"}
                          </StatusBadge>
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

          <Button
            onClick={modalOpener}
            sx={{ mx: "auto" }}
            variant="on-surface"
          >
            <AddIcon /> &nbsp;{" "}
            {selectedTab === "banks" ? "افزودن شماره کارت" : "افزودن شماره شبا"}
          </Button>
        </>
      </Stack>

      <Dialog open={modalState === "bank"} onClose={() => setModalState(null)}>
        <AddCreditCardModalForm onClose={() => setModalState(null)} />
      </Dialog>

      <Dialog open={modalState === "iban"} onClose={() => setModalState(null)}>
        <AddShabaModalForm onClose={() => setModalState(null)} />
      </Dialog>
    </>
  );
}

export default BankTableList;
