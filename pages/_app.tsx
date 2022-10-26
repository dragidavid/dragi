import type { AppProps } from "next/app";
import Script from "next/script";
import { ThemeProvider } from "next-themes";
import { Analytics } from "@vercel/analytics/react";
import Inspect from "inspx";

import "node_modules/react-grid-layout/css/styles.css";
import "node_modules/react-resizable/css/styles.css";

import LayoutProvider from "contexts/LayoutContext";

import { GA_TRACKING_ID } from "lib/analytics";

import "styles/globals.css";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <ThemeProvider attribute="class" defaultTheme="system">
      <LayoutProvider>
        <Inspect>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
            strategy="afterInteractive"
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){window.dataLayer.push(arguments);}
              gtag('js', new Date());

              gtag('config', '${GA_TRACKING_ID}');
            `}
          </Script>
          <Component {...pageProps} />
          <Analytics />
        </Inspect>
      </LayoutProvider>
    </ThemeProvider>
  );
};

export default App;
