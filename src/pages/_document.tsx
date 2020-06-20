import * as React from "react";
import Document, { Head, Main, NextScript } from "next/document";

export default class MyDocument extends Document {
  render() {
    return (
      <html>
        <Head>
          <link rel="shortcut icon" href="/logo.png" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0, maximum-scale=1.0,user-scalable=0"
          />
          <meta
            property="og:title"
            content="プログラミングでOGP画像を作れる | ogpng"
          />
          <meta property="og:type" content="page" />
          <meta
            property="og:description"
            content={`ogpngは、コードからOGP画像を生成しシェアできるサービスです。`}
          />
          <meta name="twitter:card" content="summary_large_image" />
          <meta
            name="twitter:title"
            content="プログラミングでOGP画像を作れる | ogpng"
          />
          <meta
            name="twitter:description"
            content={`ogpngは、コードからOGP画像を生成しシェアできるサービスです。`}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
