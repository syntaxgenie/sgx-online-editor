import React, { useEffect, useState } from "react";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-glsl";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/mode-rust";
import "ace-builds/src-noconflict/mode-html";
import "ace-builds/src-noconflict/mode-typescript";
import "ace-builds/src-noconflict/theme-dracula";
import "ace-builds/src-noconflict/ext-language_tools";
import "ace-builds/src-noconflict/ext-beautify";
import "ace-builds/src-noconflict/ext-code_lens";
import "ace-builds/src-noconflict/ext-spellcheck";
import "ace-builds/src-noconflict/ext-settings_menu";
import EditorToolBar from "./file/toolbar/EditorToolBar";
import { useProjects } from "../../../../contexts/projects-context/ProjectsContext";
import { NodeData } from "../../../../firebase/firestore/FileExploreHelper";

const Editor = () => {
  const projects = useProjects();
  const [nodeData, setNodeData] = useState<{ content: string, path: number[] | undefined, type: string | undefined }>();

  useEffect(() => {
    setNodeData((ps) => {
      const [file] = projects.openFiles.filter(
        (f) => f.isActive
      );
      const nd = file?.node?.nodeData as NodeData | undefined;
      if (nd && nd.content && file.path) {
        ps = { content: nd.content, path: file.path, type: nd.fileType };
      } else {
        if (file?.path) {
          ps = { content: "", path: file.path, type: "" };
        } else {
          ps = { content: "", path: undefined, type: "" };
        }
      }
      return ps;
    });
  }, [projects.openFiles]);
  // projects.

  return (
    <div className="editor-wrapper">
      <EditorToolBar />
      <div
        className="ace-wrapper"
        style={{ width: "100%", height: "calc(100% - 35px)" }}
      >
        <AceEditor
          style={{ width: "100%", height: "100%" }}
          placeholder="Enter your code here."
          name="glsl-editor"
          showGutter={true}
          onChange={(v) => {
            console.log("editor on chnage:", v)
            if (nodeData?.path) {
              projects.updateFileContent(nodeData?.path, v)
              setNodeData(ps => {
                return { content: v, path: ps?.path, type: ps?.type }
              })
            }
          }}
          setOptions={{
            enableBasicAutocompletion: true,
            enableLiveAutocompletion: true,
            spellcheck: true,
            enableSnippets: false,
            showLineNumbers: true,
            fontSize: 16,
          }}
          theme="dracula"
          mode={getLanguageByType(nodeData?.type)}
          value={nodeData?.content}

        />
      </div>
    </div>
  );
};

const getLanguageByType = (type: string | undefined) => {
  switch (type) {
    case "java":
      return "Java";
    case "glsl":
      return "glsl";
    case "js":
      return "javascript";
    case "rs":
      return "rust";
    case "html":
      return "html";
    case "go":
      return "go";
    default:
      return "";
  }
}

export default Editor;