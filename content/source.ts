import { createMDXSource, defaultSchemas } from "fumadocs-mdx";
import { loader } from "fumadocs-core/source";
import { z } from "zod";

import { map } from ".map";

export const { getPage, getPages, pageTree } = loader({
  rootDir: "craft",
  baseUrl: "/craft",
  source: createMDXSource(map, {
    schema: {
      frontmatter: defaultSchemas.frontmatter.extend({
        date: z.string().date(),
      }),
    },
  }),
});
