import React from "react";
import { useProjects } from "../../../../../../../contexts/projects-context/ProjectsContext";
import EditorNewFileButton from "./editor-new-file-button/EditorNewFileButton";
import EditorTab from "./editor-tab/EditorTab"

const EditorTabContainer = () => {

  const {openFiles} = useProjects();

    return <div className="etc-tabs">
      {openFiles.map(f=>(<EditorTab name={f?.node?.label as any} path={f.path} isActive={f.isActive}/>))}
      <EditorNewFileButton/>
    </div>;
  };
  
  export default EditorTabContainer;
  