import { Html, Head, Main, NextScript } from "next/document";

const Document = () => {
  return (
    <Html lang="en">
      <Head />
      <body className="dark:bg-palette-body-dark bg-palette-body-light transition-colors duration-200 ease-in-out">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

export default Document;
