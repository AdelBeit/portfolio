import Head from "next/head";
import React from "react";

export default function Layout({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="./favicon.png" type="image/x-icon"></link>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      {children}
    </>
  );
}
