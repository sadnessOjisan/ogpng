import * as React from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import { getOgpUrl } from "../repository/postPng";
import createGcsURL from "../helper/createGcsURL";
import createHostingURL from "../helper/createHostingURL";

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
          content={createHostingURL(process.env.NODE_ENV)}
        />
        <meta name="twitter:title" content={"title"} />
        <meta name="twitter:description" content={"description"} />
        {typeof pid === "string" && (
          <>
            <meta
              property="og:image"
              content={createGcsURL(pid, process.env.NODE_ENV)}
            />
            <meta
              name="twitter:image"
              content={createGcsURL(pid, process.env.NODE_ENV)}
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
        aaa
      </button>
    </div>
  );
}

// Result.getInitialProps = async () => {
//   const imageURL = await getOgpUrl(`i1apspps`);
//   return { imageURL };
// };
