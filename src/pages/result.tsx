import * as React from "react";
// import Head from "next/head";
import { getOgpUrl } from "../repository/postPng";

export default function Result() {
  return (
    <div>
      {/* <Head>
        <title>{"title"}</title>
        <meta property="og:title" content={"title"} />
        <meta property="og:description" content={"description"} />
        <meta property="og:url" content={image} />
        <meta property="og:image" content={image} />
        <meta property="og:site_name" content={"title"} />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:url" content={image} />
        <meta name="twitter:title" content={"title"} />
        <meta name="twitter:description" content={"description"} />
        <meta name="twitter:image" content={image} />
      </Head> */}
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
