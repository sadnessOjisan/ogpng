import * as React from "react";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import domtoimage from "dom-to-image";
import { saveOgp } from "../repository/postPng";
import { generateRandomId } from "../helper/util";
import convert from "reactel-to-html";
import "../vendor/css/monaco.css";
import "../vendor/css/normal.css";
import sampleCode from "../constatns/sampleCode";

const MonacoEditor = dynamic(import("react-monaco-editor"), { ssr: false });

type ModeType = "HTML" | "JSX";

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
  const [mode, setMode] = React.useState<ModeType>("HTML");
  const [isMount, setMount] = React.useState(false);
  const router = useRouter();
  const [text, edit] = React.useState("");
  const [code, setHTML] = React.useState("");
  const mobileView = useMedia(mediaQueries.mobile);

  React.useEffect(() => {
    setMount(true);
    edit(mobileView ? sampleCode.html.mobile : sampleCode.html.pc);
  }, []);

  React.useEffect(() => {
    if (isMount) {
      if (mode === "HTML") {
        edit(mobileView ? sampleCode.html.mobile : sampleCode.html.pc);
        setHTML(mobileView ? sampleCode.html.mobile : sampleCode.html.pc);
      } else if (mode === "JSX") {
        edit(mobileView ? sampleCode.jsx.mobile : sampleCode.jsx.pc);
        setHTML(
          mobileView
            ? convert(sampleCode.jsx.mobile)
            : convert(sampleCode.jsx.pc)
        );
      }
    } else {
      setMount(true);
    }
  }, [mode]);

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
      <p style={{ textAlign: "center" }}>
        (注)現状の設計上、imgタグに外部URLを指定することができません。もし外部URLを使いたい場合は
        <a
          href="https://sadnessojisan.github.io/img-url-to-data/"
          target="_blank"
          rel="noreferrer"
        >
          こちら
        </a>
        で外部URLをdataURIに変換し、それをimgタグのsrcに指定してください。
      </p>
      <div className="wrapper">
        <div className="radiogroup">
          <div className="radio-wrapper">
            <input
              className="state"
              type="radio"
              id="HTML"
              value="HTML"
              checked={mode === "HTML"}
              onChange={() => setMode("HTML")}
            />
            <label className="label" htmlFor="HTML">
              <div className="indicator"></div>
              <span className="text">HTML</span>
            </label>
          </div>
          <div className="radio-wrapper">
            <input
              className="state"
              type="radio"
              id="JSX"
              value="JSX"
              checked={mode === "JSX"}
              onChange={() => setMode("JSX")}
            />
            <label className="label" htmlFor="JSX">
              <div className="indicator"></div>
              <span className="text">JSX</span>
            </label>
          </div>
        </div>
        <div className="monaco-wrapper">
          <MonacoEditor
            language={mode === "HTML" ? "html" : "jsx"}
            // theme="vs"
            value={text}
            options={{ minimap: { enabled: false } }}
            onChange={(str) => {
              edit(str);
              if (mode === "HTML") {
                setHTML(str);
              } else if (mode === "JSX") {
                try {
                  setHTML(convert(str));
                } catch {
                  setHTML(str);
                }
              }
            }}
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
          <div
            ref={ref}
            dangerouslySetInnerHTML={{
              __html: code,
            }}
          />
        </div>
      </div>
      <button className="submit" onClick={handleClick}>
        <span>OGP画像を作成する</span>
        <img src="/airplane.svg" className="icon"></img>
      </button>
      <p style={{ textAlign: "center" }}>
        (注)beta版です。予告なくデータを消すことがあるかもしれません。他人を誹謗中傷する内容や公的良俗にそぐわない内容の投稿は禁止します。疑問などがございましたら
        <a
          href="https://twitter.com/sadnessOjisan"
          target="_blank"
          rel="noreferrer"
        >
          @sadnessOjisan
        </a>
        まで
      </p>
      <style jsx>{`
        html,
        body {
          background-color: #ebecf0;
        }
        a {
          color: #2e87ff;
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
        .state {
          position: absolute;
          top: 0;
          right: 0;
          opacity: 1e-5;
          pointer-events: none;
        }

        .label {
          display: inline-flex;
          align-items: center;
          cursor: pointer;
          color: #394a56;
        }

        .text {
          margin-left: 16px;
          opacity: 0.6;
          transition: opacity 0.2s linear, transform 0.2s ease-out;
        }

        .indicator {
          position: relative;
          border-radius: 50%;
          height: 30px;
          width: 30px;
          box-shadow: -8px -4px 8px 0px #ffffff, 8px 4px 12px 0px #d1d9e6;
          overflow: hidden;
        }

        .indicator::before,
        .indicator::after {
          content: "";
          position: absolute;
          top: 10%;
          left: 10%;
          height: 80%;
          width: 80%;
          border-radius: 50%;
        }

        .indicator::before {
          box-shadow: -4px -2px 4px 0px #d1d9e6, 4px 2px 8px 0px #fff;
        }

        .indicator::after {
          background-color: #ecf0f3;
          box-shadow: -4px -2px 4px 0px #fff, 4px 2px 8px 0px #d1d9e6;
          transform: scale3d(1, 1, 1);
          transition: opacity 0.25s ease-in-out, transform 0.25s ease-in-out;
        }

        .state:checked ~ .label .indicator::after {
          transform: scale3d(0.975, 0.975, 1) translate3d(0, 10%, 0);
          opacity: 0;
        }

        .state:focus ~ .label .text {
          transform: translate3d(8px, 0, 0);
          opacity: 1;
        }

        .label:hover .text {
          opacity: 1;
        }

        .radio-wrapper {
          margin-bottom: 8px;
        }
      `}</style>
    </div>
  );
}
