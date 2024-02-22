import { type SSTConfig } from "sst";
import { AstroSite, type StackContext } from "sst/constructs";

export default {
  config(_input) {
    return {
      name: "marker-blog",
      region: "eu-central-1",
    };
  },
  stacks(app) {
    app.stack(({ stack }: StackContext) => {
      const site = new AstroSite(stack, "frontend", {
        assets: {
          fileOptions: [
            {
              files: "**",
              cacheControl: "max-age=31536000,public,immutable",
            },
          ],
        },
      });

      stack.addOutputs({
        URL: site.url,
      });
    });
  },
} satisfies SSTConfig;
