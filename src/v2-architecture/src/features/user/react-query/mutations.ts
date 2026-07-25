import { createMutationOptions } from "@/v2-architecture/src/shared/lib/react-query";
import { updateAvatar, UpdateAvatarVariables } from "../api";

export const updateAvatarConfig = createMutationOptions({
  mutationFn: (vars: UpdateAvatarVariables) => {
    return updateAvatar({ body: vars });
  },
});
