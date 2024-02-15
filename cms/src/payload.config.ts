import path from "path";
import { buildConfig } from "payload/config";
import { mongooseAdapter } from "@payloadcms/db-mongodb";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import Users from "./collections/Users";
import Pages from "./collections/Pages";
import Posts from "./collections/Posts";
import Media from "./collections/Media";
import Settings from "./globals/settings";
import { webpackBundler } from "@payloadcms/bundler-webpack";

export default buildConfig({
  admin: {
    user: Users.slug,
    bundler: webpackBundler(),
    css: path.resolve(__dirname, "./styles/overrides.scss"),
  },
  editor: lexicalEditor({}),
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
});
