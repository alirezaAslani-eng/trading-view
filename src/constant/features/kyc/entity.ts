export const KYC_STEP_STATUS = {
  approved: "Approved",
  notStarted: "NotStarted",
  pending: "Pending",
  locked: "Locked",
} as const;
export type KycStepStatus =
  (typeof KYC_STEP_STATUS)[keyof typeof KYC_STEP_STATUS];
