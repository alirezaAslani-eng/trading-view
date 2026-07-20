import { AppDispatch, RootState } from "@/redux/store/types";
import {
  TypedUseSelectorHook,
  useDispatch as useDispatch_,
  useSelector as useSelector_,
} from "react-redux";

const useDispatch = useDispatch_<AppDispatch>;
const useSelector: TypedUseSelectorHook<RootState> = useSelector_;

export { useDispatch, useSelector };
