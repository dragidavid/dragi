import Link from "next/link";
import { notFound } from "next/navigation";
import { DocsBody } from "fumadocs-ui/page";
import defaultComponents from "fumadocs-ui/mdx";
import {
  ImageZoom,
  type ImageZoomProps,
} from "fumadocs-ui/components/image-zoom";
import { Pre, CodeBlock } from "fumadocs-ui/components/codeblock";

import { source } from "@/lib/source";

import Views from "@/components/views";

import { cn } from "@/lib/cn";
import { formatDate } from "@/lib/utils";

import type { Metadata } from "next";

type PageProps = {
  params: Promise<{ slug?: string[] }>;
};

export default async function Page(props: PageProps) {
  const params = await props.params;
  const post = source.getPage(params.slug);

  if (!post) {
    notFound();
  }

  const MDX = post.data.body;

  return (
    <div className={cn("h-full overflow-auto p-6", "xs:p-8")}>
      <div className={cn("mb-4 flex")}>
        <Link
          href="/craft"
          className={cn(
            "font-mono text-sm",
            "text-secondary",
            "hover:text-primary",
          )}
        >
          <span>↩ back</span>
        </Link>
      </div>

      <div className="mb-8">
        <h3 className={cn("mb-1 text-xl font-semibold tracking-tight")}>
          {post.data.title}
        </h3>

        <div
          className={cn(
            "flex justify-between font-mono text-xs",
            "text-secondary",
          )}
        >
          <span>{formatDate(post.data.date)}</span>

          <Views slug={post.file.flattenedPath} track />
        </div>
      </div>

      <DocsBody className="prose-sm">
        <MDX
          components={{
            ...defaultComponents,
            img: (props: React.ImgHTMLAttributes<HTMLImageElement>) => {
              return (
                <ImageZoom
                  {...(props as ImageZoomProps)}
                  className={cn("rounded-lg", "border border-accent")}
                />
              );
            },
            pre: ({
              title,
              ...props
            }: React.ComponentPropsWithoutRef<typeof Pre>) => (
              <CodeBlock
                title={title}
                {...props}
                className={cn("border-accent bg-extreme")}
              >
                <Pre {...props} />
              </CodeBlock>
            ),
          }}
        />
      </DocsBody>
    </div>
  );
}

export async function generateMetadata(props: PageProps) {
  const params = await props.params;
  const post = source.getPage(params.slug);

  if (!post) {
    notFound();
  }

  return {
    title: post.data.title,
    description: post.data.description,
  } satisfies Metadata;
}

export async function generateStaticParams() {
  return source.generateParams();
}
