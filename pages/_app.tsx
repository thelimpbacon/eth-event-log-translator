import React from "react";
import { AppProps } from "next/app";
import { Layout } from "@components/common";
import { Web3Manager } from "@lib/providers";

import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Web3Manager>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Web3Manager>
  );
}

export default MyApp;
