import path from "path";
import { buildConfig } from "payload/config";
import { mongooseAdapter } from "@payloadcms/db-mongodb";
import { HTMLConverterFeature, lexicalEditor } from "@payloadcms/richtext-lexical";
import { webpackBundler } from "@payloadcms/bundler-webpack";
import { cloudStorage } from "@payloadcms/plugin-cloud-storage";
import { s3Adapter } from "@payloadcms/plugin-cloud-storage/s3";
import Users from "./collections/Users";
import Pages from "./collections/Pages";
import Posts from "./collections/Posts";
import Media from "./collections/Media";
import Settings from "./globals/settings";

export default buildConfig({
  admin: {
    user: Users.slug,
    bundler: webpackBundler(),
    css: path.resolve(__dirname, "./styles/overrides.scss"),
  },
  editor: lexicalEditor({
    features: ({ defaultFeatures }) => [...defaultFeatures, HTMLConverterFeature({})],
  }),
  collections: [Users, Pages, Posts, Media],
  globals: [Settings],
  typescript: {
    outputFile: path.resolve(__dirname, "payload-types.ts"),
  },
  graphQL: {
    schemaOutputFile: path.resolve(__dirname, "generated-schema.graphql"),
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URI,
  }),
  plugins: [
    cloudStorage({
      collections: {
        media: {
          prefix: "media",
          disableLocalStorage: true,
          adapter: s3Adapter({
            config: {
              credentials: {
                accessKeyId: process.env.AWS_ACCESS_KEY_ID,
                secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
              },
              region: "eu-central-1",
            },
            bucket: process.env.S3_BUCKET,
          }),
        },
      },
    }),
  ],
});
