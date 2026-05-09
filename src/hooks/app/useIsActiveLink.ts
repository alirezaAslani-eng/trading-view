import { usePathname } from "next/navigation";
import { UseIsActiveLinkOptions } from "./types";

function useIsActiveLink({ startWith, href }: UseIsActiveLinkOptions) {
  const pathname = usePathname();
  return pathname === href || (startWith ? pathname.startsWith(startWith) : false);
}

export default useIsActiveLink;
