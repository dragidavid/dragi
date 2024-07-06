import Link from "next/link";
import { notFound } from "next/navigation";
import { allPosts } from "contentlayer/generated";

import Mdx from "components/mdx-components";
import Icon from "components/icon";
import Views from "components/views";

import { buttonVariants } from "components/primitives/button";

import { cn } from "lib/cn";
import { formatDate } from "lib/utils";

import { type Metadata } from "next";

import "styles/mdx.css";

export const revalidate = 0;

interface PageProps {
  params: { slug: string[] };
}

async function getPostFromParams(params: PageProps["params"]) {
  const slug = params?.slug?.join("/");
  const post = allPosts.find((post) => post.slugAsParams === slug);

  if (!post) {
    null;
  }

  return post;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const post = await getPostFromParams(params);

  if (!post) {
    return {};
  }

  return {
    title: post.title,
    description: post.description,
  };
}

export async function generateStaticParams(): Promise<PageProps["params"][]> {
  return allPosts.map((post) => ({
    slug: post.slugAsParams.split("/"),
  }));
}

export default async function Page({ params }: PageProps) {
  const post = await getPostFromParams(params);

  if (!post) {
    notFound();
  }

  return (
    <div className={cn("h-full overflow-auto p-6", "xs:p-8")}>
      <div className={cn("mb-4 flex")}>
        <Link
          href="/craft"
          className={cn(
            buttonVariants({ size: "icon", variant: "subtle" }),
            "size-5.5",
            "text-secondary",
          )}
        >
          <Icon name="arrow-left" size="22" />
        </Link>
      </div>

      <div className="mb-8">
        <h3 className={cn("mb-1 text-xl font-semibold tracking-tight")}>
          {post.title}
        </h3>

        <div
          className={cn(
            "flex justify-between font-mono text-sm",
            "text-secondary",
          )}
        >
          <span>{formatDate(post.date)}</span>

          <Views slug={post.slugAsParams} track />
        </div>
      </div>

      <Mdx code={post.body.code} />
    </div>
  );
}
