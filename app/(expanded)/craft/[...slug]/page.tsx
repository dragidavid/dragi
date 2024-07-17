import Link from "next/link";
import { notFound } from "next/navigation";
import { DocsBody } from "fumadocs-ui/page";

import { getPage, getPages } from "content/source";

import Views from "components/views";

import { cn } from "lib/cn";
import { formatDate } from "lib/utils";

import { type Metadata } from "next";

interface PageProps {
  params: { slug?: string[] };
}

export async function generateMetadata({ params }: PageProps) {
  const post = getPage(params.slug);

  if (!post) {
    notFound();
  }

  return {
    title: post.data.title,
    description: post.data.description,
  } satisfies Metadata;
}

export async function generateStaticParams() {
  return getPages().map((page) => ({
    slug: page.slugs,
  }));
}

export default async function Page({ params }: PageProps) {
  const post = getPage(params.slug);

  if (!post) {
    notFound();
  }

  const MDX = post.data.exports.default;

  return (
    <div className={cn("h-full overflow-auto p-6", "xs:p-8")}>
      <div className={cn("mb-4 flex")}>
        <Link href="/craft" className={cn("font-mono text-sm")}>
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

      <DocsBody className="text-xs">
        <MDX />
      </DocsBody>
    </div>
  );
}
