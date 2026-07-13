"use client";
import { Dialog } from "@mui/material";
import AddCreditCardModalForm from "@/components/template/Form/AddCreditCardModalForm";
import AddShabaModalForm from "@/components/template/Form/AddShabaModalForm";
import {
  BANK_MODAL_STATE,
  useBankModal,
} from "@/context/feature/bank/BankModal";

function BankGlobalModals() {
  const { modal, closeModal } = useBankModal()!;

  return (
    <>
      <Dialog open={modal === BANK_MODAL_STATE.cardNumber} onClose={closeModal}>
        <AddCreditCardModalForm onClose={closeModal} />
      </Dialog>

      <Dialog open={modal === BANK_MODAL_STATE.iban} onClose={closeModal}>
        <AddShabaModalForm onClose={closeModal} />
      </Dialog>
    </>
  );
}

export default BankGlobalModals;
