import type { User } from "payload/generated-types";

export const checkRole = (allRoles: User["roles"] = [], user?: User): boolean => {
  if (!user) return false;

  return allRoles.some((role) => user?.roles?.some((individualRole) => individualRole === role));
};
