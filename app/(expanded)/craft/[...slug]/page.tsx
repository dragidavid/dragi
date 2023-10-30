import { notFound } from "next/navigation";
import { allPosts } from "contentlayer/generated";

import { Mdx } from "components/mdx";

import { cn } from "lib/cn";

import { type Metadata } from "next";

import "styles/mdx.css";

import { formatDate } from "lib/utils";

type PageProps = {
  params: { slug: string[] };
};

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
    <div className={cn("h-full overflow-auto p-6")}>
      <h1 className="mb-2">{post.title}</h1>

      <p className="mt-0 text-xl text-slate-700 dark:text-slate-200">
        {formatDate(post.date)}
      </p>

      <Mdx code={post.body.code} />
    </div>
  );
}
