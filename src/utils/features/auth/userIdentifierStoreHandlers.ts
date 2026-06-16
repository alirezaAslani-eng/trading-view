const identifierSessionKey = "identifier";
export function getStoredIdentifier() {
  return sessionStorage.getItem(identifierSessionKey) ?? "";
}
export function storeIdentifier(identifier: string) {
  sessionStorage.setItem(identifierSessionKey, identifier);
}
export function removeStoredIdentifier() {
  sessionStorage.removeItem(identifierSessionKey);
}
