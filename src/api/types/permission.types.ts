interface PermissionGroup {
  id: number;
  name: string;
  description: string;
  isActive: boolean;
  permissionCount: number;
}

type PermissionGroupsResponse = PermissionGroup[];

export type { PermissionGroupsResponse, PermissionGroup };
