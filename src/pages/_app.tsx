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
      <Component {...pageProps} />
    </>
  );
}
