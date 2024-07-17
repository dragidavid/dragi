import defaultComponents from "fumadocs-ui/mdx";
import {
  ImageZoom,
  type ImageZoomProps,
} from "fumadocs-ui/components/image-zoom";
import { Pre, CodeBlock } from "fumadocs-ui/components/codeblock";

import { cn } from "lib/cn";

import { type MDXComponents } from "mdx/types";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...defaultComponents,
    ...components,
    img: (props: React.ImgHTMLAttributes<HTMLImageElement>) => {
      return (
        <ImageZoom
          {...(props as ImageZoomProps)}
          className={cn("rounded-lg", "border border-accent")}
        />
      );
    },
    pre: ({ ref: _ref, title, ...props }) => (
      <CodeBlock
        title={title}
        {...props}
        className={cn("border-accent bg-extreme")}
      >
        <Pre {...props} />
      </CodeBlock>
    ),
  };
}
