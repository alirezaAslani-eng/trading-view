const cacheDomain = {
  auth: "auth",
  kyc: "kyc",
} as const;

const authBaseKey = [cacheDomain.auth];
const kycBaseKey = [cacheDomain.auth, cacheDomain.kyc];

const kycStatusKey = [...kycBaseKey, "status" as const];
const dashboardInfoKey = [...kycBaseKey, "dashboard-info" as const];
const banksKey = [...authBaseKey, "banks"];
const walletInfoKey = [...authBaseKey, "wallet-info"];
export { kycStatusKey, dashboardInfoKey, banksKey, walletInfoKey };

// * prefix keys
export { authBaseKey, kycBaseKey };
