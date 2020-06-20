/**
 * @file _app.tsxはクライアントサイドで動くJSのエントリポイント. Firebaseの初期化処理など全ページにおける共通処理を書ける.
 */

import React, { useEffect } from "react";
import Firebase from "../infrastructure/Firebase";
import "../vendor/css/reset.css";

export default function App({ Component, pageProps }: any) {
  useEffect(() => {
    Firebase.instance.init();
  }, []);
  return (
    <>
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
      <Component {...pageProps} />
    </>
  );
}
