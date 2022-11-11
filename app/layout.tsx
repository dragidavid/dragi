import { Providers } from "app/providers";
import { Analytics } from "app/analytics";

import { Inter } from "@next/font/google";

import "styles/globals.css";

const inter = Inter();

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" className={inter.className}>
      <body>
        <Providers>
          <main>{children}</main>
        </Providers>
        <Analytics />
      </body>
    </html>
  );
}
