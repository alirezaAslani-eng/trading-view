import { ApiConfig } from "@/v2-architecture/src/api";

export const MY_COMPANY_ROLE = {
  owner: "Owner",
  trader: "Trader",
} as const;
export type MyCompanyRole =
  (typeof MY_COMPANY_ROLE)[keyof typeof MY_COMPANY_ROLE];

export type WorkspacesData = {
  companyId: string;
  companyName: string;
  companyNationalId: string;
  myRole: MyCompanyRole;
  isActive: boolean;
}[];

const FAKE_WORKSPACES: WorkspacesData = [
  {
    companyId: "1",
    companyName: "شرکت آریا تجارت",
    companyNationalId: "14007654321",
    myRole: MY_COMPANY_ROLE.owner,
    isActive: true,
  },
  {
    companyId: "2",
    companyName: "بازرگانی پارسیان",
    companyNationalId: "14009876543",
    myRole: MY_COMPANY_ROLE.trader,
    isActive: false,
  },
  {
    companyId: "3",
    companyName: "هلدینگ سپهر نوین",
    companyNationalId: "14001122334",
    myRole: MY_COMPANY_ROLE.owner,
    isActive: false,
  },
];

export const workspaces = async ({
  signal,
}: ApiConfig = {}): Promise<WorkspacesData> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(FAKE_WORKSPACES);
    }, 1200); // شبیه‌سازی تاخیر شبکه
  });
};
