import Head from "next/head";
import React from "react";

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
}

export default function Layout({
  children,
  title = "Adele Beitvashahi",
}: LayoutProps) {
  const favicon = "/favicon.png";
  return (
    <>
      <Head>
        <title>{title}</title>

        {/* <link rel="manifest" href="/manifest.webmanifest" />
        <link rel="apple-touch-icon" href="/app_icons/icon-192x192.png" />
        <meta name="theme-color" content="#fff" /> */}

        <meta charSet="utf-8" />
        <link rel="icon" href={favicon} type="image/icon"></link>

        {/* <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="application-name" content="Adele" />
        <meta name="apple-mobile-web-app-title" content="Adele" />
        <meta name="msapplication-starturl" content="/" /> */}
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, shrink-to-fit=yes"
        ></meta>
      </Head>
      {children}
    </>
  );
}
