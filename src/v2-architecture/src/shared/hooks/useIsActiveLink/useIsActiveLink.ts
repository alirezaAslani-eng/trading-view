import { usePathname } from "next/navigation";
import { UseIsActiveLinkOptions } from "./types";

function useIsActiveLink({ exact = true, href }: UseIsActiveLinkOptions) {
  const pathname = usePathname();
  return pathname === href || (!exact ? pathname.startsWith(href) : false);
}

export default useIsActiveLink;
