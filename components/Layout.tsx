import Navigation from "components/Navigation";
import Footer from "components/Footer";
import React from "react";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <Navigation />
      {children}
      <Footer />
    </>
  );
}
