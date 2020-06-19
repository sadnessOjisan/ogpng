import * as React from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import { getOgpUrl } from "../repository/postPng";
import createHostingURL from "../helper/createHostingURL";
import cloudStorageKeys from "../constatns/cloudStorageKeys";
import env from "../helper/env";
import createGcsURL from "../helper/createGcsURL";

export default function Result() {
  const router = useRouter();
  const { pid } = router.query;
  return (
    <div>
      <Head>
        <title>{"created OGP"}</title>
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
      <button
        onClick={async () => {
          const d = await getOgpUrl(`i1apspps`);
          console.log(d);
        }}
      >
        <img
          src={`${createGcsURL(env())}/${cloudStorageKeys.OGP}/${pid}`}
        ></img>
      </button>
      <style jsx>{`
        img {
          width: 50%;
        }
      `}</style>
    </div>
  );
}
