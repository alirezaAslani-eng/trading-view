import { usePathname } from "next/navigation";

function useIsActiveLink(href) {
  const pathname = usePathname();
  return pathname === href;
}

export default useIsActiveLink;
