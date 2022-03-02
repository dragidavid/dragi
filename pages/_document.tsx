import { Html, Head, Main, NextScript } from "next/document";

const Document = () => {
  return (
    <Html lang="en">
      <Head />
      <body className="bg-gray-50 transition-all duration-500 ease-in-out dark:bg-black">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

export default Document;
