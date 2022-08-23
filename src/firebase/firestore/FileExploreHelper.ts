import { ITreeNode } from "@blueprintjs/core";

export interface NodeData {
  MainType: "FILE" | "FOLDER" | "PROJECT";
  fileType: string;
  content: string | null;
  id: string;
  path: string;
  name: string;
}

const addNewFile = (folder: ITreeNode, newFile: ITreeNode,tree:ITreeNode): ITreeNode => {
    return tree;
};

const addNewFolder = (folder: ITreeNode, newFile: ITreeNode,tree:ITreeNode): ITreeNode => {
    return tree;
};

const removeNode = (Node: ITreeNode,tree:ITreeNode): ITreeNode => {
    return tree;
};

export { addNewFile, addNewFolder, removeNode };
