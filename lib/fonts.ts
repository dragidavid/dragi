import localFont from "next/font/local";

const satoshi = localFont({
  src: "../public/fonts/Satoshi-Variable.woff2",
  variable: "--font-satoshi",
  display: "swap",
});

const spaceGrotesk = localFont({
  src: "../public/fonts/SpaceGrotesk-Variable.woff2",
  variable: "--font-space-grotesk",
  display: "swap",
});

const switzer = localFont({
  src: "../public/fonts/Switzer-Variable.woff2",
  variable: "--font-switzer",
  display: "swap",
});

const outfit = localFont({
  src: "../public/fonts/Outfit-Variable.woff2",
  variable: "--font-outfit",
  display: "swap",
});

export { satoshi, spaceGrotesk, switzer, outfit };
