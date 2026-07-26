import { createMutationOptions } from "@/v2-architecture/src/shared/lib/react-query";
import { updateAvatar, UpdateAvatarVariables } from "../api";
import { dashboardInfoKey } from "@/packages/react-query";

export const updateAvatarConfig = createMutationOptions({
  mutationFn: (vars: UpdateAvatarVariables) => {
    return updateAvatar({ body: vars });
  },
  meta: {
    invalidates: [dashboardInfoKey],
  },
});
