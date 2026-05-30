import ENV_CHECK from "@/constant/app/envCheck";

function fetchURL(path: string): string {
  const BASEURL = ENV_CHECK.isSerevr
    ? process.env.BASEURL
    : process.env.NEXT_PUBLIC_BASEURL;
  return `${BASEURL}${path}`;
}

export default fetchURL;
