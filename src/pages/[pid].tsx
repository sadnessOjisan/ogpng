import * as React from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import { getOgpUrl } from "../repository/postPng";
import createGcsURL from "../helper/createGcsURL";
import createHostingURL from "../helper/createHostingURL";
import cloudStorageKeys from "../constatns/cloudStorageKeys";

export default function Result() {
  const router = useRouter();
  const { pid } = router.query;
  return (
    <div>
      <Head>
        <title>{"title"}</title>
        <meta property="og:title" content={"title"} />
        <meta property="og:description" content={"description"} />
        <meta
          property="og:url"
          content={createHostingURL(process.env.NODE_ENV)}
        />
        <meta property="og:site_name" content={"title"} />
        <meta name="twitter:card" content="summary" />
        <meta
          name="twitter:url"
          content={`${createHostingURL(process.env.NODE_ENV)}`}
        />
        <meta name="twitter:title" content={"title"} />
        <meta name="twitter:description" content={"description"} />
        {typeof pid === "string" && (
          <>
            <meta
              property="og:image"
              content={`${createHostingURL(process.env.NODE_ENV)}/${
                cloudStorageKeys.OGP
              }/${pid}`}
            />
            <meta
              name="twitter:image"
              content={`${createHostingURL(process.env.NODE_ENV)}/${
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
          src={`${createHostingURL(process.env.NODE_ENV)}/${
            cloudStorageKeys.OGP
          }/${pid}`}
        ></img>
      </button>
    </div>
  );
}

// Result.getInitialProps = async () => {
//   const imageURL = await getOgpUrl(`i1apspps`);
//   return { imageURL };
// };