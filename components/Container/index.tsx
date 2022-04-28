import React, { FC, ReactNode } from "react";
import { useRouter } from "next/router";
import Head from "next/head";

const Container: FC<ReactNode> = ({ children }) => {
  const router = useRouter();

  const meta = {
    title: "David Dragovacz",
    description:
      "It's my personal website. 👋🏼 I'm a frontend developer and three.js fan among other things.",
    image: "https://dragi.me/static/images/banner.png",
    type: "website",
  };

  return (
    <div>
      <Head>
        <title>{meta.title}</title>
        <meta name="robots" content="follow, index" />
        <meta content={meta.description} name="description" />
        <meta property="og:url" content={`https://dragi.me${router.asPath}`} />
        <link rel="canonical" href={`https://dragi.me${router.asPath}`} />
        <meta property="og:type" content={meta.type} />
        <meta property="og:site_name" content="David Dragovacz" />
        <meta property="og:description" content={meta.description} />
        <meta property="og:title" content={meta.title} />
        <meta property="og:image" content={meta.image} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@dragidavid" />
        <meta name="twitter:title" content={meta.title} />
        <meta name="twitter:description" content={meta.description} />
        <meta name="twitter:image" content={meta.image} />
      </Head>

      <main className="flex h-screen flex-col justify-between">{children}</main>
    </div>
  );
};

export default Container;
