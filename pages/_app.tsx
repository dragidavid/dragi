import type { AppProps } from "next/app";
import { ThemeProvider } from "next-themes";
import Inspect from "inspx";

import "node_modules/react-grid-layout/css/styles.css";
import "node_modules/react-resizable/css/styles.css";

import LayoutProvider from "contexts/LayoutContext";

import "styles/globals.css";

/**
 * TODO replace the Logo with something else
 * TODO find a better way to generate the gradients for the tiles
 */

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <ThemeProvider attribute="class" defaultTheme="system">
      <LayoutProvider>
        <Inspect>
          <Component {...pageProps} />
        </Inspect>
      </LayoutProvider>
    </ThemeProvider>
  );
};

export default App;
