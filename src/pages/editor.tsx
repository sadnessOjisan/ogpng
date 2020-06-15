import * as React from "react";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import domtoimage from "dom-to-image";
import { saveOgp } from "../repository/postPng";
import { generateRandomId } from "../helper/util";

const MonacoEditor = dynamic(import("react-monaco-editor"), { ssr: false });

export default function Editor() {
  const router = useRouter();
  const [text, edit] = React.useState(
    '<div style="background-color: yellow; height: 300px;"> \n<p style="color: blue;">はじめてのCSS</p></div>'
  );
  const ref = React.useRef<HTMLDivElement>(null);

  const handleClick = () => {
    const imageId = generateRandomId();
    domtoimage
      .toBlob(ref.current)
      .then(async (blob) => {
        await saveOgp(imageId, blob);
        router.push(`/${imageId}`);
      })
      .catch(function (error) {
        console.error("oops, something went wrong!", error);
      });
  };

  return (
    <div>
      <div className="wrapper">
        <div className="monaco-wrapper">
          <MonacoEditor
            language="html"
            theme="vs"
            value={text}
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
        <div className="preview" ref={ref}>
          <div dangerouslySetInnerHTML={{ __html: text }} />
        </div>
      </div>
      <button className="submit" onClick={handleClick}>
        送信
      </button>
      <style jsx>{`
        .wrapper {
          display: flex;
          align-items: center;
          padding: 8px;
        }
        .monaco-wrapper {
          width: 50%;
          height: 80vh;
          border-radius: 4px;
          margin-right: 8px;
          border: solid 1px gray;
        }
        .preview {
          width: 50%;
          height: 30%;
        }
        .submit {
          display: block;
          margin: 16px auto;
          border: solid 1px black;
        }
      `}</style>
    </div>
  );
}
