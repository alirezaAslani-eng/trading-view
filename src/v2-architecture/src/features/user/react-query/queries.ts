import { queryOptions } from "@tanstack/react-query";
import { userAvatarKey } from "./keys";
import { userAvatar } from "../api";

export const userAvatarConfig = () =>
  queryOptions({
    queryKey: userAvatarKey,
    queryFn: ({ signal }) => {
      return userAvatar({ signal });
    },
  });
