import * as React from "react";
import dynamic from "next/dynamic";

const MonacoEditor = dynamic(import("react-monaco-editor"), { ssr: false });

export default function Editor() {
  const [text, edit] = React.useState("");
  return (
    <MonacoEditor
      height={"600px"}
      language="typescript"
      theme="vs-dark"
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
  );
}
