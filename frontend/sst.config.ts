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
        cdk: {
          responseHeadersPolicy: {
            responseHeadersPolicyId: "f8ff6416-eca2-4c38-bff2-3d16dfcfc4ac",
          },
        },
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
