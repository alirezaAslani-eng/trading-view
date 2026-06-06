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
const productCategoriesKey = [...authBaseKey, "product-categories"];
export {
  kycStatusKey,
  dashboardInfoKey,
  banksKey,
  walletInfoKey,
  productCategoriesKey,
};

// * prefix keys
export { authBaseKey, kycBaseKey };
