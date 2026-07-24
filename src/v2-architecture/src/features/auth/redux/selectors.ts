import { RootState } from "@/redux/store/types";

export const isOpenAuthModal = (state: RootState) => state.authModal.isOpen;
