import fetchHandler from "@/utils/app/fetchHandler";
import handleApiResponse from "@/utils/app/handleApiResponse";
import { KycL1RequestBody } from "@/api/types";
import { sharedRequestInit } from "../sharedRequestInit";
import mutationFetch from "@/utils/app/mutationFetch";
const URL = (isCompany: boolean) => {
  return `${process.env.NEXT_PUBLIC_AUTH_BASEURL}/api/v1/kyc/level1${
    isCompany ? "/company" : ""
  }`;
};

async function kycL1(body: KycL1RequestBody): Promise<void> {
  const res = (await fetchHandler(async () => {
    const res = await mutationFetch(URL(body.isCompany), {
      ...sharedRequestInit,
      method: "POST",
      body: JSON.stringify(transformBody(body)),
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res;
  })) as Response;

  await handleApiResponse(res);
}

export default kycL1;

function transformBody(body: KycL1RequestBody) {
  return {
    ...(body.isCompany
      ? {
          companyNationalId: body.nationalId,
        }
      : {
          nationalId: body.nationalId,
          birthDateShamsi: formatShamsiDate(
            body.birthDay,
            body.birthMonth,
            body.birthDay
          ),
        }),
  };
}

function formatShamsiDate(
  year: number | string,
  month: number | string,
  day: number | string
): string {
  function pad2(value: number | string): string {
    return String(value).padStart(2, "0");
  }
  return `${year}/${pad2(month)}/${pad2(day)}`;
}
