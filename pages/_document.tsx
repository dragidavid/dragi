import { Html, Head, Main, NextScript } from "next/document";

const Document = () => {
  return (
    <Html lang="en">
      <Head />
      <body className="dark:bg-palette-body-dark bg-palette-body-light text-gray-600 transition-colors duration-200 ease-in-out dark:text-gray-400">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

export default Document;
