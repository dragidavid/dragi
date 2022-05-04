// Temporary solution until https://github.com/pacocoursey/next-themes/issues/99 is resolved

import "next-themes";

declare module "next-themes" {
  interface ThemeProviderProps {
    children: React.ReactNode;
  }
}
