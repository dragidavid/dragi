import createMDX from "fumadocs-mdx/config";
import { createCssVariablesTheme } from "shiki/core";

const vercel = createCssVariablesTheme({
  name: "css-variables",
  variablePrefix: "--shiki-",
  variableDefaults: {},
  fontStyle: true,
});

const withMDX = createMDX({
  mdxOptions: {
    rehypeCodeOptions: {
      themes: {
        light: vercel,
        dark: vercel,
      },
    },
  },
});

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.scdn.co",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default withMDX(config);
