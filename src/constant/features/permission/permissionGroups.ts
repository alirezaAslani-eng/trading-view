const PERMISSION_GROUP = {
  StandardUser: "StandardUser",
  Admin: "Admin",
} as const;

type PermissionGroup =
  (typeof PERMISSION_GROUP)[keyof typeof PERMISSION_GROUP];

const PERMISSION_GROUP_LABELS: Record<PermissionGroup, string> = {
  [PERMISSION_GROUP.StandardUser]: "کاربر عادی",
  [PERMISSION_GROUP.Admin]: "مدیر",
};

const getPermissionGroup = (
  groups: PermissionGroup[],
): Record<`is${PermissionGroup}`, boolean> => {
  return {
    isStandardUser: groups.includes(PERMISSION_GROUP.StandardUser),
    isAdmin: groups.includes(PERMISSION_GROUP.Admin),
  };
};

export { PERMISSION_GROUP, PERMISSION_GROUP_LABELS, getPermissionGroup };
export type { PermissionGroup };