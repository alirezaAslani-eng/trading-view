import LayoutAuthPage from "@/Layout/LayoutAuthPage";
import { PWC } from "@/types/utils";

function layout({ children }:PWC) {
  return <LayoutAuthPage>{children}</LayoutAuthPage>;
}

export default layout;
