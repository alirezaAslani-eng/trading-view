export interface PermissionGroup {
  id: number;
  name: string;
  description: string;
  isActive: boolean;
  permissionCount: number;
}
export type PermissionGroupsResponse = PermissionGroup[];
export interface PermissionItem {
  id: number;
  name: string;
  displayName: string;
  isAssigned: boolean;
}
export interface PermissionCategory {
  categoryId: number;
  categoryName: string;
  caption: string;
  permissions: PermissionItem[];
}
export interface PermissionChecklistResponse {
  groupId: number;
  groupName: string;
  categories: PermissionCategory[];
}

export interface AssignPermissionRequest {
  groupId: number;
  permissionIds: number[];
}
