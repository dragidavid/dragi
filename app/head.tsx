export default async function Head() {
  return (
    <>
      <title>David Dragovacz</title>

      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta
        name="description"
        content="An open source application built using the new router, server components and everything new in Next.js 13."
      />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://tx.shadcn.com" />
      <meta property="og:image" content="https://tx.shadcn.com/og.jpg" />
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content="https://tx.shadcn.com" />
      <meta property="twitter:image" content="https://tx.shadcn.com/og.jpg" />

      <link rel="shortcut icon" href="/static/favicons/favicon.ico" />
    </>
  );
}
