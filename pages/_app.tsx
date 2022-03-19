import type { AppProps } from "next/app";
import { ThemeProvider } from "next-themes";
import Inspect from "inspx";

import "node_modules/react-grid-layout/css/styles.css";
import "node_modules/react-resizable/css/styles.css";

import "styles/globals.css";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <ThemeProvider attribute="class" defaultTheme="system">
      <Inspect>
        <Component {...pageProps} />
      </Inspect>
    </ThemeProvider>
  );
};

export default App;
