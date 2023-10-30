import Link from "next/link";

import { allPosts } from "contentlayer/generated";

import Heading from "components/ui/Heading";

import { cn } from "lib/cn";

export default function Preview() {
  return (
    <div className={cn("relative h-full")}>
      <Heading>Craft</Heading>

      <div>
        {allPosts.map((post) => (
          <article key={post._id}>
            <Link href={post.slug}>
              <h2>{post.title}</h2>
            </Link>
            {post.description && <p>{post.description}</p>}
          </article>
        ))}
      </div>
    </div>
  );
}
