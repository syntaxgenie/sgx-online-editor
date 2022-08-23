import {
  Button,
  Divider,
  InputGroup,
  ITreeNode,
  Tree,
} from "@blueprintjs/core";
import React, { useRef, useState } from "react";
import { firestore as db } from "../../../../../../..";
import { useEditor } from "../../../../../../../contexts/editor-context/EditorContext";
import { useProjects } from "../../../../../../../contexts/projects-context/ProjectsContext";
import { NodeData } from "../../../../../../../firebase/firestore/FileExploreHelper";
import { COLLECTIONS } from "../../../../../../../firebase/firestore/Firestore";
import {
  importFolderAsProject,
} from "../../../../../../../helper/Hepler";
import "./import-project-container.scss";

interface IProps{
  onFinsh:()=>void
}


const ImportProjectContainer = (props:IProps) => {
  

  const editor = useEditor();

  const folderInput = useRef<HTMLInputElement>(null);
  const projects = useProjects();
  const [importedData, setImportedData] = useState<ITreeNode<NodeData>[]>([]);
  const [projectId, setProjectId] = useState<string>("");

  const handleNodeClick = (
    nodeData: ITreeNode,
    _nodePath: number[],
    e: React.MouseEvent<HTMLElement>
  ) => {
    const originallySelected = nodeData.isSelected;
    if (!e.shiftKey) {
      forEachNode(importedData || [], (n) => (n.isSelected = false));
    }
    nodeData.isSelected =
      originallySelected == null ? true : !originallySelected;
    setImportedData((ps) => [...ps]);
  };

  const handleNodeCollapse = (nodeData: ITreeNode) => {
    setImportedData((ps) => {
      nodeData.isExpanded = false;
      return [...ps];
    });
  };

  const handleNodeExpand = (nodeData: ITreeNode) => {
    setImportedData((ps) => {
      nodeData.isExpanded = true;
      return [...ps];
    });
  };

  const forEachNode = (
    nodes: ITreeNode[],
    callback: (node: ITreeNode) => void
  ) => {
    if (nodes == null) {
      return;
    }
    for (const node of nodes) {
      callback(node);
      forEachNode(node.childNodes || [], callback);
    }
  };

  //------------------------
  const viewProjectWithId = (id:string) =>{
    if(id.length>0){
      db.collection(COLLECTIONS.PROJECTS).doc(id).get().then(ds=>{
        if(ds.exists){
          const project =ds.data() as any;
          setImportedData(project.data)
        }else{
          editor.showMessage("Can't find project.","danger")
          setProjectId("");
        }
       
      })
    }

  }

  return (
    <div className="import-project-container">
      <div className="import-project-link">
        <label style={{ marginRight: "10px" }}>Project Id</label>
        <div className="link-actions">
          <InputGroup
            id="txtLink"
            onChange={(e) => setProjectId(e.target.value)}
            value={projectId}
            placeholder="Project Id"
          />
          <Button style={{ marginLeft: "10px" }} onClick={()=>{
            viewProjectWithId(projectId)
          }}>View</Button>
        </div>
      </div>
      <Divider style={{ marginRight: 0, marginLeft: 0 }} />
      <div className="import-project-folder">
        <label>Import Project from local folder</label>

        <input
          style={{ display: "none" }}
          directory=""
          webkitdirectory=""
          type="file"
          ref={folderInput}
          onChange={(e) => {
            if (e.target.files) {
              const files: FileList = e.target.files;
              const x = importFolderAsProject(files);
              setImportedData(x);
            }
          }}
        />
        <Button
          onClick={() => {
            folderInput.current?.click();
          }}
        >
          Upload Folder
        </Button>
        <Divider style={{ marginRight: 0, marginLeft: 0, marginTop: "20px" }} />
        <div className="" style={{ marginTop: "10px", marginBottom: "10px" }}>
          <div
            className="tree-wrapper"
            style={{ marginTop: "10px", maxHeight: "190px", overflowY: "auto" }}
          >
            {importedData.length === 0 && (
              <label className="empty-c">Please Open a folder...</label>
            )}
            <Tree
              contents={importedData || []}
              onNodeClick={handleNodeClick}
              onNodeCollapse={handleNodeCollapse}
              onNodeExpand={handleNodeExpand}
            />
          </div>
        </div>

        <div style={{ textAlign: "right" }}>
          <Button
            onClick={() => {
              projects.createNewProject_b({
                data: importedData,
                name: (importedData[0].label as string) || "",
                owner: "",
              });
              setProjectId("")
              setImportedData([])
              props.onFinsh()
            }}
            style={{ marginLeft: "10px" }}
          >
            Import
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ImportProjectContainer;

declare module "react" {
  interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
    // extends React's HTMLAttributes
    directory?: string; // remember to make these attributes optional....
    webkitdirectory?: string;
  }
}
