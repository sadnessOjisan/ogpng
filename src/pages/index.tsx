import * as React from "react";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import domtoimage from "dom-to-image";
import { saveOgp } from "../repository/postPng";
import { generateRandomId } from "../helper/util";
import "../vendor/css/monaco.css";
import "../vendor/css/normal.css";

const MonacoEditor = dynamic(import("react-monaco-editor"), { ssr: false });

const mediaQueries = {
  mobile: "(max-width: 767px)",
  prefersReducedMotion: "(prefers-reduced-motion: reduce)",
};

function useMedia(query) {
  const [matches, setMatches] = React.useState(
    typeof window !== "undefined" ? window.matchMedia(query).matches : false
  );

  React.useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }

    const listener = () => setMatches(media.matches);
    media.addListener(listener);

    return () => media.removeListener(listener);
  }, [query]);

  return matches;
}

export default function Editor() {
  const router = useRouter();
  const [text, edit] = React.useState("");
  const mobileView = useMedia(mediaQueries.mobile);
  React.useEffect(() => {
    console.log("mobileView", mobileView);
    edit(
      mobileView
        ? `<div style="
    background: radial-gradient(#F2B9A1, #EA6264);
    width: 219px;
    height: 110px;
    padding: 12px;
    text-align: center;
    color: white;
    font-size: 12px;
    font-family: 'ヒラギノ角ゴ ProN W3';
    display: flex;
    flex-direction: column;
    justify-content: center;
    "
>
   <p style="margin-bottom: 8px;">HTMLならなんでも書き込めます。</p>
   <p style="margin-bottom: 8px;">TwitterのOGPは438 x 220 です。</p>
   <p>JS & JSX 対応をいま頑張ってます。</p>
</div>`
        : `<div style="
      background: radial-gradient(#F2B9A1, #EA6264);
      width: 438px;
      height: 220px;
      padding: 24px;
      text-align: center;
      color: white;
      font-size: 20px;
      font-family: 'ヒラギノ角ゴ ProN W3';
      display: flex;
      flex-direction: column;
      justify-content: center;
      "
  >
     <p style="margin-bottom: 12px;">HTMLならなんでも書き込めます。</p>
     <p style="margin-bottom: 12px;">TwitterのOGPは438 x 220 です。</p>
     <p>JS & JSX の対応をいま頑張ってます。</p>
  </div>`
    );
  }, []);
  const ref = React.useRef<HTMLDivElement>(null);

  const handleClick = () => {
    const scale = 2;
    const imageId = generateRandomId();
    domtoimage
      .toPng(ref.current, {
        // NOTE: 画質対応
        // https://github.com/tsayen/dom-to-image/issues/69
        height: ref.current.offsetHeight * scale,
        width: ref.current.offsetWidth * scale,
        style: {
          transform: "scale(" + scale + ")",
          transformOrigin: "top left",
          width: ref.current.offsetWidth + "px",
          height: ref.current.offsetHeight + "px",
        },
      })
      .then((dataURL) => {
        const img = new Image();
        img.src = dataURL;
        img.crossOrigin = "Anonymous";
        img.onload = () => {
          const canvas = document.createElement("canvas");
          canvas.width = ref.current.offsetWidth * 2;
          canvas.height = ref.current.offsetHeight * 2;
          const ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          // canvasをblobに変換し、FileSaverでダウンロードを行う
          canvas.toBlob(async (blob) => {
            await saveOgp(imageId, blob);
            router.push(`/${imageId}`);
          });
        };
      })
      .catch(function (error) {
        console.error("oops, something went wrong!", error);
      });
  };

  return (
    <div className="container">
      <h1>
        OGPNG
        <span> &#010;beta</span>
      </h1>
      <h2>コードから画像作成してシェアできるサービス</h2>
      <div className="wrapper">
        <div className="monaco-wrapper">
          <MonacoEditor
            language="html"
            // theme="vs"
            value={text}
            options={{ minimap: { enabled: false } }}
            onChange={edit}
            editorDidMount={() => {
              // @ts-ignore
              window.MonacoEnvironment.getWorkerUrl = (moduleId, label) => {
                if (label === "json") return "/_next/static/json.worker.js";
                if (label === "css") return "/_next/static/css.worker.js";
                if (label === "html") return "/_next/static/html.worker.js";
                if (label === "typescript" || label === "javascript")
                  return "/_next/static/ts.worker.js";
                return "/_next/static/editor.worker.js";
              };
            }}
          />
        </div>
        <div className="preview">
          <div ref={ref} dangerouslySetInnerHTML={{ __html: text }} />
        </div>
      </div>
      <button className="submit" onClick={handleClick}>
        <span>OGP画像を作成する</span>
        <img src="/airplane.svg" className="icon"></img>
      </button>
      <p style={{ textAlign: "center" }}>
        (注)beta版です。予告なくデータを消すことがあるかもしれません。他人を誹謗中傷する内容や公的良俗にそぐわない内容の投稿は禁止します。
      </p>
      <style jsx>{`
        html,
        body {
          background-color: #ebecf0;
        }
        h1,
        h2 {
          font-family: -apple-system, BlinkMacSystemFont,
            "Hiragino Kaku Gothic ProN", Meiryo, sans-serif;
          text-align: center;
        }
        h1 {
          font-size: 48px;
          letter-spacing: 5px;
          margin-bottom: 8px;
          color: rgba(0, 0, 0, 0.8);
          font-weight: 900;
        }
        h1 > span {
          font-size: 16px;
          color: #2e87ff;
          font-style: italic;
        }
        h2 {
          font-size: 24px;
          margin-bottom: 24px;
          color: gray;
        }
        .container {
          background-color: #ebecf0;
          padding: 20px;
          height: 100vh;
        }
        @media screen and (max-width: 480px) {
          .container {
            min-height: 100vh;
          }
        }
        .wrapper {
          display: flex;
          height: 75%;
          align-items: center;
          padding: 4px;
          justify-content: space-evenly;
        }
        @media screen and (max-width: 480px) {
          .wrapper {
            flex-wrap: wrap;
            height: initial;
          }
        }
        .monaco-wrapper {
          width: 45%;
          height: 90%;
          border-radius: 4px;
          box-shadow: -2px -2px 5px rgba(255, 255, 255, 1),
            3px 3px 5px rgba(0, 0, 0, 0.1);
        }
        @media screen and (max-width: 480px) {
          .monaco-wrapper {
            width: 100%;
            height: 500px;
            margin-bottom: 24px;
          }
        }
        .preview {
          width: 45%;
          height: 70%;
          padding: 24px;
          background-color: white;
          border-radius: 12px;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        @media screen and (max-width: 480px) {
          .preview {
            width: 100%;
          }
        }
        .submit {
          display: block;
          margin: 8px auto;
          margin-bottom: 24px;
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
        }
        .submit:hover {
          box-shadow: -2px -2px 5px #fff, 2px 2px 5px #babecc;
        }
        .submit:active {
          box-shadow: inset 1px 1px 2px #babecc, inset -1px -1px 2px #fff;
        }
        @media screen and (max-width: 480px) {
          .submit {
            margin-bottom: 0;
            margin-bottom: 24px;
          }
        }
        .icon {
          width: 20px;
          height: 20px;
          margin-left: 12px;
        }
        p {
          color: gray;
          font-family: -apple-system, BlinkMacSystemFont,
            "Hiragino Kaku Gothic ProN", Meiryo, sans-serif;
        }
      `}</style>
    </div>
  );
}
