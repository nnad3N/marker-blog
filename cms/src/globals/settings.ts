import type { GlobalConfig } from "payload/types";

const Settings: GlobalConfig = {
  slug: "settings",
  fields: [
    {
      name: "websiteTitle",
      label: "Website Title",
      type: "text",
    },
    {
      name: "websiteDescription",
      label: "Website Description",
      type: "textarea",
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
