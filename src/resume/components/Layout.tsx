import Head from "next/head";
import React from "react";

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
}

export default function Layout({ children, title = "Adele" }: LayoutProps) {
  const favicon = "/favicon.png";
  return (
    <>
      <Head>
        <title>{title}</title>
        <link rel="icon" href={favicon} type="image/x-icon"></link>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      {children}
    </>
  );
}
