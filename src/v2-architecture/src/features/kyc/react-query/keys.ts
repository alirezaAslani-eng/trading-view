//#region // * ------------ queries ------------
export const kycProgressKey = ["kyc-progress"];
export const workspacesKey = ["workspaces"];
//#endregion // * ------------ queries ------------

//#region // * ------------ mutations ------------
export const kycL3Key = ["kycL3"];
export const companyMembersKey = ["company-members"];
export const companyMembersDynamicKey = (companyId: string) => [
  ...companyMembersKey,
  companyId,
];
//#endregion // * ------------ mutations ------------
