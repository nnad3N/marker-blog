import { SSTConfig } from "sst";
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
      const site = new AstroSite(stack, "website", {
        path: "frontend/",
      });

      stack.addOutputs({
        URL: site.url,
      });
    });
  },
} satisfies SSTConfig;
