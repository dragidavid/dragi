import { Html, Head, Main, NextScript } from "next/document";

const Document = () => {
  return (
    <Html lang="en">
      <Head />
      <body className="bg-white text-gray-600 transition-colors duration-200 ease-in-out dark:bg-black dark:text-gray-400">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

export default Document;
