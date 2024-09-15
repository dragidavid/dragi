import { createMDXSource } from "fumadocs-mdx";
import { loader } from "fumadocs-core/source";

import { docs, meta } from ".source";

export const source = loader({
  baseUrl: "/craft",
  source: createMDXSource(docs, meta),
});
