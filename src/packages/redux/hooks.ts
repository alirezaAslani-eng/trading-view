import { AppDispatch, RootState } from "@/redux/store/types";
import {
  useDispatch as useDispatch_,
  useSelector as useSelector_,
} from "react-redux";

const useDispatch = useDispatch_.withTypes<AppDispatch>();
const useSelector = useSelector_.withTypes<RootState>();

export { useDispatch, useSelector };
