import { createMutationOptions } from "@/v2-architecture/src/shared/lib/react-query";
import { userAvatarKey } from "./keys";
import {
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
