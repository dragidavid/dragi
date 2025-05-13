import {
  defineDocs,
  defineConfig,
  frontmatterSchema,
  getDefaultMDXOptions,
} from "fumadocs-mdx/config";
import { z } from "zod";
import { createCssVariablesTheme } from "shiki/core";

const vercel = createCssVariablesTheme({
  name: "css-variables",
  variablePrefix: "--shiki-",
  variableDefaults: {},
  fontStyle: true,
});

export const docs = defineDocs({
  dir: "content/docs",
  docs: {
    mdxOptions: getDefaultMDXOptions({
      rehypeCodeOptions: {
        themes: {
          light: vercel,
          dark: vercel,
        },
      },
    }),
    schema: frontmatterSchema.extend({
      date: z.string().date(),
    }),
  },
});

export default defineConfig({
  lastModifiedTime: "git",
});

