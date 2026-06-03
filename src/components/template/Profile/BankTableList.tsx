import {
    CircularProgress,
    Box, Divider, Stack, ToggleButton, TableCell,
    TableBody,
    TableHead,
    TableRow,
    Dialog,
} from "@mui/material";
import {
    AddIcon,
    TrashIcon,
} from "@/components/ui/Icon";
import ToggleTabGroup from "@/components/ui/ButtonGroup/ToggleTabGroup";
import Button from "@/components/ui/Button/Button";
import Table from "@/components/ui/Table/Table";
import StatusBadge from "@/components/ui/Status/StatusBadge";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { ModalLayout, ModalLayoutBody, ModalLayoutCloseIcon, ModalLayoutHeading, ModalLayoutTitle } from "@/components/ui/Layout/ModalLayout";
import AddCreditCardForm from "@/components/template/Form/AddCreditCardForm"
import AddShabaForm from "@/components/template/Form/AddShabaForm"
import { getBankAccounts } from "@/api";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBankAccount } from "@/api";


// ! Issiue : Some data dosen't come from server like `nationalId` and `birthdate`
function BankInfoOverviewSection() {
    const searchParams = useSearchParams();
    const [open, setOpen] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [selectedTab, setSelectedTab] = useState(searchParams.get("tab") || "1");
    const queryClient = useQueryClient();

    const { isLoading, error, data: bankAccounts } = useQuery({
        queryKey: ["bank-accounts"],
        queryFn: getBankAccounts
    })

    const { isPending, mutate: deleteMutation } = useMutation({
        mutationFn: deleteBankAccount,
        onSuccess: () => {
            // Invalidate and refetch
            queryClient.invalidateQueries({ queryKey: ["bank-accounts"] });
        },
    });

    const handleDelete = (id: number) => {
        deleteMutation(id);
    };

    const formatCardNumber = (cardNumber: string) => {
        return cardNumber.replace(/(\d{4})(?=\d)/g, "$1-");
    };

    const handleTabChange = (event: React.MouseEvent<HTMLElement>, newValue: string | null) => {
        if (newValue) {
            setSelectedTab(newValue);
            const url = new URL(window.location.href);
            url.searchParams.set("tab", newValue);
            window.history.pushState({}, "", url);
        }
    };

    console.log(error);


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
                        <ToggleButton value={"1"}>{"شماره کارت"}</ToggleButton>
                        <Divider orientation="vertical" flexItem />
                        <ToggleButton value={"2"}>{"شماره حساب"}</ToggleButton>
                        <Divider orientation="vertical" flexItem />
                        <ToggleButton value={"3"}>{"قرارداد واریز مستقیم"}</ToggleButton>
                    </ToggleTabGroup>
                    {/* // * ----end---- Tabs -------- */}
                </Box>

                {/* Conditional render based on tab */}
                {selectedTab === "2" && (
                    <>
                    <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: "18px",
                        mt: "32px",
                    }}
                >
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>{"بانک"}</TableCell>

                                <TableCell>{"شماره شبا"}</TableCell>

                                <TableCell>{"وضعیت"}</TableCell>

                                <TableCell sx={{ textAlign: "center !important" }}>{"عملیات"}</TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {isLoading ? (
                                <TableRow>
                                    <TableCell colSpan={4} sx={{ textAlign: "center", py: 4 }}>
                                        <CircularProgress size={24} />
                                    </TableCell>
                                </TableRow>
                            ) : !!!bankAccounts?.length ? (
                                <TableRow>
                                    <TableCell colSpan={4} sx={{ textAlign: "center", py: 4 }}>
                                        {"هیچ شبایی ثبت نشده است"}
                                    </TableCell>
                                </TableRow>
                            ) : (
                                isPending ? (<TableRow>
                                    <TableCell colSpan={4} sx={{ textAlign: "center", py: 4 }}>
                                        <CircularProgress size={24} />
                                    </TableCell>
                                </TableRow>) : (bankAccounts.map((account) => (
                                    <TableRow key={account.id}>
                                        <TableCell>{account.bankName}</TableCell>
                                        <TableCell>{formatCardNumber(account.iban)}</TableCell>
                                        <TableCell>
                                            <StatusBadge color={account.isVerified ? "success" : "warning"}>
                                                {account.isVerified ? "تایید شده" : "در حال بررسی"}
                                            </StatusBadge>
                                        </TableCell>
                                        <TableCell sx={{ display: "flex", justifyContent: "center" }}>
                                            <Box
                                                sx={{ cursor: "pointer" }}
                                                onClick={() => handleDelete(account.id)}
                                            >
                                                <TrashIcon />
                                            </Box>
                                        </TableCell>
                                    </TableRow>)
                                ))
                            )}
                        </TableBody>
                    </Table>
                </Box>
                <Divider
                    sx={{ mt: "40px", mb: "20px", borderColor: "border.dark" }}
                />
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", my: "20px" }}  >
                    <Button onClick={() => { setIsOpen(true) }} variant="on-surface"> <AddIcon /> &nbsp; {"افزودن شبا"}</Button>
                </Box>
                </>
                )}

                {selectedTab === "1" && (
                    <>
                        {/* // * ---start--- BankList -------- */}
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: "18px",
                                mt: "32px",
                            }}
                        >
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>{"بانک"}</TableCell>

                                        <TableCell>{"شماره کارت"}</TableCell>

                                        <TableCell>{"وضعیت"}</TableCell>

                                        <TableCell sx={{ textAlign: "center !important" }}>{"عملیات"}</TableCell>
                                    </TableRow>
                                </TableHead>

                                <TableBody>
                                    {isLoading ? (
                                        <TableRow>
                                            <TableCell colSpan={4} sx={{ textAlign: "center", py: 4 }}>
                                                <CircularProgress size={24} />
                                            </TableCell>
                                        </TableRow>
                                    ) : !!!bankAccounts?.length ? (
                                        <TableRow>
                                            <TableCell colSpan={4} sx={{ textAlign: "center", py: 4 }}>
                                                {"هیچ کارتی ثبت نشده است"}
                                            </TableCell>
                                        </TableRow>
                                    ) : (
                                        isPending ? (<TableRow>
                                            <TableCell colSpan={4} sx={{ textAlign: "center", py: 4 }}>
                                                <CircularProgress size={24} />
                                            </TableCell>
                                        </TableRow>) : (bankAccounts.map((account) => (
                                            <TableRow key={account.id}>
                                                <TableCell>{account.bankName}</TableCell>
                                                <TableCell>{formatCardNumber(account.cardNumber)}</TableCell>
                                                <TableCell>
                                                    <StatusBadge color={account.isVerified ? "success" : "warning"}>
                                                        {account.isVerified ? "تایید شده" : "در حال بررسی"}
                                                    </StatusBadge>
                                                </TableCell>
                                                <TableCell sx={{ display: "flex", justifyContent: "center" }}>
                                                    <Box
                                                        sx={{ cursor: "pointer" }}
                                                        onClick={() => handleDelete(account.id)}
                                                    >
                                                        <TrashIcon />
                                                    </Box>
                                                </TableCell>
                                            </TableRow>)
                                        ))
                                    )}
                                </TableBody>
                            </Table>
                        </Box>


                        <Divider
                            sx={{ mt: "40px", mb: "20px", borderColor: "border.dark" }}
                        />
                        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", my: "20px" }}  >
                            <Button onClick={() => { setOpen(true) }} variant="on-surface"> <AddIcon /> &nbsp; {"افزودن کارت"}</Button>
                        </Box>
                    </>
                )}
            </Stack>

            <Dialog open={open} onClose={() => setOpen(false)}>
                <ModalLayout>
                    <ModalLayoutHeading>
                        <ModalLayoutTitle title="افزودن کارت" subtitle="" />
                        <ModalLayoutCloseIcon onClick={() => setOpen(false)} />
                    </ModalLayoutHeading>
                    <ModalLayoutBody>
                        <AddCreditCardForm />
                    </ModalLayoutBody>
                </ModalLayout>
            </Dialog>

            <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
                <ModalLayout>
                    <ModalLayoutHeading>
                        <ModalLayoutTitle title="افزودن شبا" subtitle="" />
                        <ModalLayoutCloseIcon onClick={() => setIsOpen(false)} />
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
