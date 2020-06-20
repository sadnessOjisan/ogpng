import * as React from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import createHostingURL from "../helper/createHostingURL";
import cloudStorageKeys from "../constatns/cloudStorageKeys";
import env from "../helper/env";
import createGcsURL from "../helper/createGcsURL";

export default function Result() {
  const [url, setURL] = React.useState("");
  React.useEffect(() => {
    setURL(window.location.href);
  }, []);
  const router = useRouter();
  const { pid } = router.query;
  return (
    <div className="wrapper">
      <Head>
        <title>{"created OGP"}</title>
        <meta name="twitter:card" content="summary_large_image"></meta>
        <meta property="og:url" content={`${createHostingURL(env())}/${pid}`} />
        {typeof pid === "string" && (
          <>
            <meta
              property="og:image"
              content={`${createHostingURL(env())}/${
                cloudStorageKeys.OGP
              }/${pid}`}
            />
            <meta
              name="twitter:image"
              content={`${createHostingURL(env())}/${
                cloudStorageKeys.OGP
              }/${pid}`}
            />
          </>
        )}
      </Head>
      <h1>生成された画像</h1>
      <img src={`${createGcsURL(env())}/${cloudStorageKeys.OGP}/${pid}`}></img>
      <a href={`https://twitter.com/intent/tweet?text=${url}`}>
        <button>OGP画像をシェアする</button>
      </a>
      <style jsx>{`
        .wrapper {
          text-align: center;
          background-color: #ebecf0;
          height: 100vh;
          padding: 24px;
        }
        h1 {
          font-family: -apple-system, BlinkMacSystemFont,
            "Hiragino Kaku Gothic ProN", Meiryo, sans-serif;
          font-size: 48px;
          letter-spacing: 5px;
          margin-bottom: 8px;
          color: rgba(0, 0, 0, 0.6);
          font-weight: 900;
          margin-bottom: 24px;
        }
        img {
          width: 50%;
          margin: auto;
          max-width: 590px;
        }
        button {
          display: block;
          margin: 16px auto;
          box-shadow: -5px -5px 20px #fff, 5px 5px 20px #babecc;
          transition: all 0.2s ease-in-out;
          cursor: pointer;
          font-weight: 500;
          color: #2e87ff;
          order: 0;
          outline: 0;
          font-size: 16px;
          border-radius: 320px;
          padding: 16px 48px;
          background-color: #ebecf0;
          font-family: -apple-system, BlinkMacSystemFont,
            "Hiragino Kaku Gothic ProN", Meiryo, sans-serif;
          margin-top: 52px;
        }
      `}</style>
    </div>
  );
}
