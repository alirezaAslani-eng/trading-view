// --- userAvatar ---

import { apiClient, ApiConfig, apiError } from "@/v2-architecture/src/api";

const url = apiClient.authBaseURL("/api/v1/user/avatar-image");

export const userAvatar = async ({
  signal,
}: ApiConfig = {}): Promise<UserAvatarData> => {
  const res = await apiClient.get(url, { signal, cache: "no-cache" });
  const blob = await apiError.blobHandler(res);
  return blob ? URL.createObjectURL(blob) : null;
};

//#region // * ------------ Shared types ------------
export type UserAvatarData = string | null;
//#endregion // * ------------ Shared types ------------
