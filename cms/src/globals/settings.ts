import type { GlobalConfig } from "payload/types";
import { adminOrEditor, anyone } from "../collections/Users/access";
import { invokeRedeployWebhook } from "../hooks";

const Settings: GlobalConfig = {
  slug: "settings",
  access: {
    read: anyone,
    update: adminOrEditor,
  },
  hooks: {
    afterChange: [
      async ({ doc }) => {
        if (doc._status === "draft") return;
        await invokeRedeployWebhook();
      },
    ],
  },
  versions: {
    drafts: true,
    max: 1,
  },
  fields: [
    {
      name: "websiteTitle",
      label: "Website Title",
      type: "text",
      required: true,
    },
    {
      name: "websiteDescription",
      label: "Website Description",
      type: "textarea",
      required: true,
    },
    {
      type: "array",
      name: "socials",
      minRows: 1,
      fields: [
        {
          type: "text",
          name: "url",
          label: "URL",
          required: true,
        },
        {
          type: "select",
          name: "platform",
          required: true,
          options: [
            {
              value: "x",
              label: "X",
            },
            {
              value: "instagram",
              label: "Instagram",
            },
            {
              value: "facebook",
              label: "Facebook",
            },
          ],
        },
      ],
    },
  ],
};

export default Settings;
