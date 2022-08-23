import React, { useState } from "react";
import {
  ContextMenu,
  ITreeNode,
  Menu,
  MenuDivider,
  MenuItem,
  Tree,
} from "@blueprintjs/core";
import { useProjects } from "../../../../../contexts/projects-context/ProjectsContext";
import NewFolderDialog from "../../dialogs/new-folder-dialog/NewFolderDialog";
import { NodeData } from "../../../../../firebase/firestore/FileExploreHelper";
import MainDialog, { ActiveTab } from "../../dialogs/main-dialog/MainDialog";
import { exportProject } from "../../../../../helper/Hepler";

const FileExplore = () => {
  const {
    currentProject,
    setProjectData,
    deleteNode,
    addNewFile,
    addNewFolder,
    openFile,
    setActiveFile,
    closeCurrentProject
    
  } = useProjects();
  const [showNewFileDialog, setShowNewFileDialog] = useState(false);
  const [showCreateFolderDialog, setShowCreateFolderDialog] = useState(false);
  const [selectedNode, setSeectedNode] = useState<{
    path: number[];
    node: ITreeNode;
  }>();

  const handleNodeClick = (
    nodeData: ITreeNode,
    _nodePath: number[],
    e: React.MouseEvent<HTMLElement>
  ) => {
    const originallySelected = nodeData.isSelected;
    if (!e.shiftKey) {
      forEachNode(currentProject?.data || [], (n) => (n.isSelected = false));
    }
    nodeData.isSelected =
      originallySelected == null ? true : !originallySelected;
    setSeectedNode({ node: nodeData, path: _nodePath });
    if (currentProject) setProjectData();
    if ((nodeData.nodeData as NodeData).MainType === "FILE") {
      openFile(_nodePath);
      setActiveFile(_nodePath)
    }
    
  };

  const handleNodeCollapse = (nodeData: ITreeNode) => {
    nodeData.isExpanded = false;
    if (currentProject) setProjectData();
  };

  const handleNodeExpand = (nodeData: ITreeNode) => {
    nodeData.isExpanded = true;
    if (currentProject) setProjectData();
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

  const showContextMenu = (nodeData: any, path: any, e: any) => {

    // const projects = useProjects();

    e.preventDefault();
    const data = (nodeData as ITreeNode).nodeData as NodeData;
    if (data.MainType === "PROJECT") {
      ContextMenu.show(
        <Menu style={{ backgroundColor: "rgb(39, 65, 79)", color: "white" }}>
          <MenuItem
            text="New File"
            onClick={() => {
              setShowNewFileDialog(true);
            }}
          />
          <MenuItem
            text="New Folder"
            onClick={() => {
              setShowCreateFolderDialog(true);
            }}
          />

          <MenuDivider />
          <MenuItem text="Export" onClick={()=>{
            exportProject(nodeData,data.name);
          }} />
          <MenuDivider />
          <MenuItem text="Delete" />
          <MenuItem text="Close" onClick={()=>{
           closeCurrentProject();
          }} />
        </Menu>,
        { left: e.clientX, top: e.clientY }
      );
    } else if (data.MainType === "FOLDER") {
      ContextMenu.show(
        <Menu style={{ backgroundColor: "rgb(39, 65, 79)", color: "white" }}>
          <MenuItem
            text="New File"
            onClick={() => {
              setShowNewFileDialog(true);
            }}
          />
          <MenuItem
            text="New Folder"
            onClick={() => {
              setShowCreateFolderDialog(true);
            }}
          />

          <MenuDivider />
          <MenuItem text="Cut" />
          <MenuItem text="Copy" />
          <MenuItem
            text="Delete"
            onClick={() => {
              deleteNode(path);
            }}
          />
        </Menu>,
        { left: e.clientX, top: e.clientY }
      );
    } else if (data.MainType === "FILE") {
      ContextMenu.show(
        <Menu style={{ backgroundColor: "rgb(39, 65, 79)", color: "white" }}>
          <MenuItem text="Cut" />
          <MenuItem text="Copy" />
          <MenuItem
            text="Delete"
            onClick={() => {
              deleteNode(path);
            }}
          />
        </Menu>,
        { left: e.clientX, top: e.clientY }
      );
    }
  };

  return (
    <>
      <div className="file-explore-wrapper">
        <div
          style={{
            width: "100%",
            height: "100%",
            paddingLeft: "10px",
            paddingRight: "10px",
            paddingTop: "10px",
          }}
        >
          <Tree
            onNodeContextMenu={(nodeData: any, path: any, e: any)=>{showContextMenu(nodeData,path,e)}}
            contents={currentProject?.data || []}
            onNodeClick={handleNodeClick}
            onNodeCollapse={handleNodeCollapse}
            onNodeExpand={handleNodeExpand}
          />
        </div>
      </div>
      <NewFolderDialog
        show={showCreateFolderDialog}
        onClose={() => setShowCreateFolderDialog(false)}
        onCreate={(folderName) => {
          addNewFolder(selectedNode?.path || [], folderName);
          setShowCreateFolderDialog(false);
        }}
      />
      <MainDialog
        activeTab={ActiveTab.NEW_FILE}
        show={showNewFileDialog}
        onClose={() => setShowNewFileDialog(false)}
        onCreate={(fileName, fileType) => {
          addNewFile(selectedNode?.path || [], fileName, fileType);
          setShowNewFileDialog(false);
        }}
      />
    </>
  );
};

export default FileExplore;
