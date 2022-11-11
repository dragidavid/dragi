import { ThemeProvider } from "next-themes";
import { Analytics } from "@vercel/analytics/react";
import Inspect from "inspx";

import "node_modules/react-grid-layout/css/styles.css";
import "node_modules/react-resizable/css/styles.css";

import LayoutProvider from "contexts/LayoutContext";

import type { AppProps } from "next/app";

import "styles/globals.css";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <ThemeProvider attribute="class" defaultTheme="system">
      <LayoutProvider>
        <Inspect>
          <Component {...pageProps} />
          <Analytics />
        </Inspect>
      </LayoutProvider>
    </ThemeProvider>
  );
};

export default App;
