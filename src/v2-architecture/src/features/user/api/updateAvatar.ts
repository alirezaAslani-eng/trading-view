import { apiClient, ApiConfig, apiError } from "@/v2-architecture/src/api";

const URL = apiClient.authBaseURL("/api/v1/user/avatar");

export interface UpdateAvatarVariables {
  file: File;
}
type Config = ApiConfig<{ body: UpdateAvatarVariables }>;
export const updateAvatar = async ({ signal, body }: Config): Promise<void> => {
  const res = await apiClient.post(URL, { signal, body: getBody(body) });
  await apiError.jsonHandler<void>(res);
};

function getBody(body: UpdateAvatarVariables) {
  const formData = new FormData();
  formData.append("file", body.file);
  return formData;
}
