import { CollectionConfig } from "payload/types";
import { ensureFirstUserIsAdmin } from "./access/ensureFirstUserIsAdmin";
import { admin, adminOrEditor } from "./access";

const Users: CollectionConfig = {
  slug: "users",
  auth: true,
  admin: {
    useAsTitle: "email",
  },
  access: {
    read: adminOrEditor,
    create: admin,
    update: admin,
    delete: admin,
    admin: admin,
  },
  fields: [
    {
      name: "roles",
      type: "select",
      hasMany: true,
      defaultValue: ["user"],
      options: [
        {
          label: "admin",
          value: "admin",
        },
        {
          label: "editor",
          value: "editor",
        },
      ],
      hooks: {
        beforeChange: [ensureFirstUserIsAdmin],
      },
      access: {
        read: admin,
        create: admin,
        update: admin,
      },
    },
  ],
};

export default Users;
