import * as React from "react";
import dynamic from "next/dynamic";

const MonacoEditor = dynamic(import("react-monaco-editor"), { ssr: false });

export default function Editor() {
  const [text, edit] = React.useState(
    '<div style="background-color: yellow; height: 300px;"> \n<p style="color: blue;">はじめてのCSS</p></div>'
  );
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
        <div className="preview">
          <div dangerouslySetInnerHTML={{ __html: text }} />
        </div>
      </div>
      <button className="submit">送信</button>
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
