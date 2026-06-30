interface PermissionGroup {
  id: number;
  name: string;
  description: string;
  isActive: boolean;
  permissionCount: number;
}
type PermissionGroupsResponse = PermissionGroup[];
interface PermissionItem {
  id: number;
  name: string;
  displayName: string;
  isAssigned: boolean;
}
interface PermissionCategory {
  categoryId: number;
  categoryName: string;
  caption: string;
  permissions: PermissionItem[];
}
interface PermissionChecklistResponse {
  groupId: number;
  groupName: string;
  categories: PermissionCategory[];
}

interface AssignPermissionRequest {
  groupId: number;
  permissionIds: number[];
}

type UserPermissionsResponse = string[];

export type {
  AssignPermissionRequest,
  PermissionCategory,
  PermissionChecklistResponse,
  PermissionGroup,
  PermissionGroupsResponse,
  PermissionItem,
  UserPermissionsResponse,
};
