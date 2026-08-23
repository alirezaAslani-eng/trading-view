import { createMutationOptions } from "@/v2-architecture/src/shared/lib/react-query";
import { userAvatarKey } from "./keys";
import {
  changePassword,
  ChangePasswordVariables,
  createPassword,
  CreatePasswordVariables,
  updateAvatar,
  UpdateAvatarVariables,
} from "../api";

export const updateAvatarConfig = createMutationOptions({
  mutationFn: (vars: UpdateAvatarVariables) => {
    return updateAvatar({ body: vars });
  },
  meta: {
    invalidates: [userAvatarKey],
  },
});

export const createPasswordConfig = createMutationOptions({
  mutationFn: (vars: CreatePasswordVariables) => {
    return createPassword({ body: vars });
  },
});

export const changePasswordConfig = createMutationOptions({
  meta: { successMessage: "رمز عبور با موفقیت تغییر کرد" },
  mutationFn: (vars: ChangePasswordVariables) => {
    return changePassword({ body: vars });
  },
});
