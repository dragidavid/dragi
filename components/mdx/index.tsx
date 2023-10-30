import * as React from "react";
import Image, { ImageProps } from "next/image";
import { useMDXComponent } from "next-contentlayer/hooks";

import { Callout } from "components/mdx/callout";
import { MdxCard } from "components/mdx/mdx-card";
import { Tweet } from "components/mdx/tweet";

import { cn } from "lib/cn";

const components = {
  h1: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1
      className={cn(
        "mt-2 scroll-m-20 text-4xl font-extrabold tracking-tight",
        "text-black",
        "dark:text-white",
        className,
      )}
      {...props}
    />
  ),
  h2: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2
      className={cn(
        "mt-10 scroll-m-20 pb-1 text-3xl font-bold tracking-tight",
        "text-black",
        "dark:text-white",
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
        "text-black",
        "dark:text-white",
        className,
      )}
      {...props}
    />
  ),
  h4: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h4
      className={cn(
        "mt-8 scroll-m-20 text-xl font-semibold tracking-tight",
        "text-black",
        "dark:text-white",
        className,
      )}
      {...props}
    />
  ),
  h5: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h5
      className={cn(
        "mt-8 scroll-m-20 text-lg font-semibold tracking-tight",
        "text-black",
        "dark:text-white",
        className,
      )}
      {...props}
    />
  ),
  h6: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h6
      className={cn(
        "mt-8 scroll-m-20 tracking-tight",
        "text-black",
        "dark:text-white",
        className,
      )}
      {...props}
    />
  ),
  a: ({ className, ...props }: React.HTMLAttributes<HTMLAnchorElement>) => (
    <a
      className={cn(
        "font-medium",
        "text-black underline decoration-accent underline-offset-2",
        "hover:decoration-black",
        "dark:text-white",
        "dark:hover:decoration-white",
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
      className={cn(
        "my-6 ml-10",
        "list-disc marker:text-primary/50",
        className,
      )}
      {...props}
    />
  ),
  ol: ({ className, ...props }: React.HTMLAttributes<HTMLOListElement>) => (
    <ol
      className={cn(
        "my-6 ml-10",
        "list-decimal marker:text-primary/50",
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
        "[&>*]:text-black",
        "dark:[&>*]:text-white",
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
        "border-b border-accent text-black",
        "[&[align=center]]:text-center [&[align=right]]:text-right",
        "dark:text-white",
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
  pre: ({ className, ...props }: React.HTMLAttributes<HTMLPreElement>) => (
    <pre
      className={cn(
        "not-prose",
        "mb-4 mt-6 overflow-x-auto rounded-lg py-4",
        "border border-accent",
        "[&>code]:font-normal",
        className,
      )}
      {...props}
    />
  ),
  code: ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => (
    <code
      className={cn(
        "not-prose",
        "font-mono relative rounded px-[0.3rem] py-[0.2rem] text-sm font-bold",
        "border border-accent bg-[--shiki-color-background]",
        className,
      )}
      {...props}
    />
  ),
  Image: (props: ImageProps) => (
    <Image {...props} alt={props.alt} className="rounded-lg" />
  ),
  Callout,
  Card: MdxCard,
  Tweet,
};

interface MdxProps {
  code: string;
}

export function Mdx({ code }: MdxProps) {
  const Component = useMDXComponent(code);

  return (
    <article
      className={cn(
        // "prose",
        "some-random-ass-class-so-the-line-breaks min-w-full",
        "dark:prose-invert",
      )}
    >
      <Component components={components} />
    </article>
  );
}
