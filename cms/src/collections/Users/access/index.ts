import type { Access, AccessArgs } from "payload/config";

import type { User } from "payload/generated-types";
import { checkRole } from "./checkRole";

type isUser = (args: AccessArgs<unknown, User>) => boolean;

export const admin: isUser = ({ req: { user } }) => checkRole(["admin"], user);

export const editor: isUser = ({ req: { user } }) => checkRole(["editor"], user);

export const adminOrEditor: isUser = ({ req: { user } }) => checkRole(["admin", "editor"], user);

export const anyone: Access = () => true;
