import * as React from "react";
import Image, { type ImageProps } from "next/image";
import { useMDXComponent } from "next-contentlayer/hooks";

import Tweet from "components/tweet";
import Callout from "components/callout";
import CopyButton from "components/copy-button";

import { cn } from "lib/cn";

const components = {
  h1: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1
      className={cn(
        "mt-2 scroll-m-20 text-4xl font-extrabold tracking-tight",
        "text-inverse",
        className,
      )}
      {...props}
    />
  ),
  h2: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2
      className={cn(
        "mt-10 scroll-m-20 pb-1 text-3xl font-bold tracking-tight",
        "text-inverse",
        "first:mt-0",
        className,
      )}
      {...props}
    />
  ),
  h3: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3
      className={cn(
        "mt-8 scroll-m-20 text-2xl font-semibold tracking-tight",
        "text-inverse",
        className,
      )}
      {...props}
    />
  ),
  h4: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h4
      className={cn(
        "mt-8 scroll-m-20 text-xl font-semibold tracking-tight",
        "text-inverse",
        className,
      )}
      {...props}
    />
  ),
  h5: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h5
      className={cn(
        "mt-8 scroll-m-20 text-lg font-semibold tracking-tight",
        "text-inverse",
        className,
      )}
      {...props}
    />
  ),
  h6: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h6
      className={cn(
        "mt-8 scroll-m-20 tracking-tight",
        "text-inverse",
        className,
      )}
      {...props}
    />
  ),
  a: ({ className, ...props }: React.HTMLAttributes<HTMLAnchorElement>) => (
    <a
      className={cn(
        "font-medium",
        "text-inverse underline decoration-accent underline-offset-2",
        "hover:decoration-inverse",
        className,
      )}
      {...props}
    />
  ),
  p: ({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p
      className={cn("leading-7", "[&:not(:first-child)]:mt-6", className)}
      {...props}
    />
  ),
  ul: ({ className, ...props }: React.HTMLAttributes<HTMLUListElement>) => (
    <ul
      className={cn("my-6 ml-10", "list-disc marker:text-secondary", className)}
      {...props}
    />
  ),
  ol: ({ className, ...props }: React.HTMLAttributes<HTMLOListElement>) => (
    <ol
      className={cn(
        "my-6 ml-10",
        "list-decimal marker:text-secondary",
        className,
      )}
      {...props}
    />
  ),
  li: ({ className, ...props }: React.HTMLAttributes<HTMLLIElement>) => (
    <li className={cn("mt-4 pl-1", className)} {...props} />
  ),
  blockquote: ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => (
    <blockquote
      className={cn(
        "mt-6 pl-6 font-medium italic",
        "border-l-2 border-accent",
        "[&>*]:text-inverse",
        className,
      )}
      {...props}
    />
  ),
  img: ({
    className,
    alt,
    ...props
  }: React.ImgHTMLAttributes<HTMLImageElement>) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img className={cn("rounded-md border", className)} alt={alt} {...props} />
  ),
  hr: ({ ...props }) => (
    <hr
      className={cn("-mx-6 my-4", "border-px border-accent", "md:my-8")}
      {...props}
    />
  ),
  table: ({ className, ...props }: React.HTMLAttributes<HTMLTableElement>) => (
    <div
      className={cn(
        "my-6 w-full overflow-y-auto",
        "rounded-lg border border-accent",
      )}
    >
      <table className={cn("w-full", className)} {...props} />
    </div>
  ),
  tr: ({ className, ...props }: React.HTMLAttributes<HTMLTableRowElement>) => (
    <tr
      className={cn(
        "m-0 p-0",
        "border-b border-accent",
        "last:border-none",
        className,
      )}
      {...props}
    />
  ),
  th: ({ className, ...props }: React.HTMLAttributes<HTMLTableCellElement>) => (
    <th
      className={cn(
        "px-4 py-2 text-left font-bold",
        "border-b border-accent text-inverse",
        "[&[align=center]]:text-center [&[align=right]]:text-right",
        className,
      )}
      {...props}
    />
  ),
  td: ({ className, ...props }: React.HTMLAttributes<HTMLTableCellElement>) => (
    <td
      className={cn(
        "px-4 py-2 text-left",
        "[&[align=center]]:text-center [&[align=right]]:text-right",
        className,
      )}
      {...props}
    />
  ),
  pre: ({
    className,
    __rawString__,
    ...props
  }: React.HTMLAttributes<HTMLPreElement> & {
    __rawString__?: string;
  }) => {
    return (
      <>
        <pre
          className={cn(
            "overflow-x-auto rounded-lg py-4",
            "border border-accent",
            className,
          )}
          {...props}
        />

        <CopyButton value={__rawString__} />
      </>
    );
  },
  code: ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => (
    <code
      className={cn(
        "relative rounded px-[0.3rem] py-[0.2rem] font-mono text-sm font-bold",
        "border border-accent bg-extreme",
        className,
      )}
      {...props}
    />
  ),
  Image: (props: ImageProps) => (
    <Image {...props} alt={props.alt} className="rounded-lg" />
  ),
  Tweet,
  Callout,
};

interface MdxProps {
  code: string;
}

export function Mdx({ code }: MdxProps) {
  const Component = useMDXComponent(code);

  return (
    <article className="min-w-full">
      <Component components={components} />
    </article>
  );
}
