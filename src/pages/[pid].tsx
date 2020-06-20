import * as React from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";
import createHostingURL from "../helper/createHostingURL";
import cloudStorageKeys from "../constatns/cloudStorageKeys";
import env from "../helper/env";
import createGcsURL from "../helper/createGcsURL";
import { GetServerSideProps, NextPage } from "next";

export default function Result(props: NextPage & { pid: string }) {
  const [url, setURL] = React.useState("");
  React.useEffect(() => {
    setURL(window.location.href);
  }, []);
  const appEnv = env();
  console.log("appEnv:", appEnv);
  console.log(
    "urpp",
    `${createGcsURL(env())}/${cloudStorageKeys.OGP}/${props.pid}`
  );
  return (
    <div className="wrapper">
      <Head>
        <title>{"created OGP"}</title>
        <meta
          property="og:image"
          content={`${createGcsURL(appEnv)}/${cloudStorageKeys.OGP}/${
            props.pid
          }`}
        />
        <meta
          property="og:url"
          content={`${createHostingURL(appEnv)}/${props.pid}`}
        />

        <meta property="og:type" content="article" />
        <meta
          property="og:description"
          content={`ogpngは、HTMLからOGP画像を生成しシェアできるサービスです。`}
        />

        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:description"
          content={`ogpngは、HTMLからOGP画像を生成しシェアできるサービスです。`}
        />
        <meta
          name="twitter:image"
          content={`${createGcsURL(env())}/${cloudStorageKeys.OGP}/${
            props.pid
          }`}
        />
      </Head>
      <h1>生成された画像</h1>
      <img
        src={`${createGcsURL(env())}/${cloudStorageKeys.OGP}/${props.pid}`}
      ></img>
      <a href={`https://twitter.com/intent/tweet?text=${url}`}>
        <button>
          OGP画像をシェアする
          <img src="/twitter.svg" className="icon"></img>
        </button>
      </a>
      <Link href="/">
        <button>←TOPに戻る</button>
      </Link>
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
        button:hover {
          box-shadow: -2px -2px 5px #fff, 2px 2px 5px #babecc;
        }
        button:active {
          box-shadow: inset 1px 1px 2px #babecc, inset -1px -1px 2px #fff;
        }
        .icon {
          width: 20px;
          height: 20px;
          margin-left: 12px;
        }
      `}</style>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { pid } = context.query;
  return { props: { pid } };
};
