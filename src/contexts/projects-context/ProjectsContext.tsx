import { ITreeNode } from "@blueprintjs/core";
import { createContext, useContext, useEffect, useState } from "react";
import { NodeData } from "../../firebase/firestore/FileExploreHelper";
import {
  addNewProject,
  addProjectsListener,
  defaultDoc,
  deleteProject,
  updateProjectData,
} from "../../firebase/firestore/Firestore";
import { FileTypes } from "../../screens/main-screen/components/dialogs/main-dialog/MainDialog";
import { useEditor } from "../editor-context/EditorContext";
import { useUser } from "../user-context/UserContext";

export interface Project extends defaultDoc {
  id?: string;
  name: string;
  owner: string;
  data: ITreeNode<NodeData>[] | null;
}

export interface Node extends defaultDoc {
  id: string;
  name: string;
  isFile: boolean;
}

export interface Folder extends Node {
  childrens: Node[];
}

export interface File extends Node {
  type: string;
}

export interface IEditorContext {
  projects: Project[];
  currentProject: Project | null;
  openFiles: { node: ITreeNode<NodeData>; path: number[]; isActive: boolean }[];
  createNewProject: (
    projectName: string,
    data?: ITreeNode<NodeData>[] | null
  ) => void;
  removeProject: (project: Project) => void;
  openProject: (project: Project) => void;
  setProjectData: () => void;
  deleteNode: (path: number[]) => void;
  addNewFolder: (path: number[], folderName: string) => void;
  addNewFile: (path: number[], fileName: string, fileType: FileTypes) => void;
  openFile: (path: number[]) => void;
  saveFileContent: (path: number[], content: string) => void;
  setActiveFile: (path: number[]) => void;
  updateFileContent: (path: number[], content: string) => void;
  closeFile: (path: number[]) => void;
  createNewProject_b: (project: Project) => void;
  closeCurrentProject: () => void;
}

interface IState {
  projects: Project[];
  currentProject: Project | null;
}

const initialContext: IEditorContext = {
  projects: [],
  openFiles: [],
  currentProject: null,
  createNewProject: (
    projectName: string,
    data?: ITreeNode<NodeData>[] | null
  ) => { },
  removeProject: (project: Project) => { },
  openProject: (project: Project) => { },
  setProjectData: () => { },
  deleteNode: (path: number[]) => { },
  addNewFolder: (path: number[], folderName: string) => { },
  addNewFile: (path: number[], fileName: string, fileType: FileTypes) => { },
  openFile: (path: number[]) => { },
  saveFileContent: (path: number[], content: string) => { },
  setActiveFile: (path: number[]) => { },
  updateFileContent: (path: number[], content: string) => { },
  closeFile: (path: number[]) => { },
  createNewProject_b: (project: Project) => { },
  closeCurrentProject: () => { },
};

const initialState: IState = {
  projects: [],
  currentProject: null,
};

const ProjectsContext = createContext<IEditorContext>(initialContext);

interface IProps {
  owner: string | null | undefined;
  children: any;
}

export const ProjectsProvider = (props: IProps) => {
  const [state, setState] = useState(initialState);
  const [openFiles, setOpenFiles] = useState<
    { node: ITreeNode<NodeData>; path: number[]; isActive: boolean }[]
  >([]);

  const editor = useEditor();

  useEffect(() => {
    setState({ currentProject: null, projects: [] });
    let unset: any;
    if (props.owner) {
      unset = addProjectsListener(props.owner, (projects, type) => {
        if (type === "added") {
          setState((ps) => {
            projects.forEach((p) => {
              if (ps.projects.filter((x) => x.id === p.id).length === 0) {
                ps.projects.push(p);
              }
            });
            // ps.currentProject = projects[projects.length - 1]
            return { ...ps };
          });
        }
        if (type === "modified") {
          setState((ps) => {
            projects.forEach((p) => {
              ps.projects = ps.projects.map((op) => {
                if (p.id === op.id) {
                  return p;
                } else {
                  return op;
                }
              });
            });
            return { ...ps, projects: [...ps.projects] };
          });
        }

        if (type === "removed") {
          setState((ps) => {
            projects.forEach((p) => {
              ps.projects = ps.projects.filter((fp) => p.id !== fp.id);
            });
            return { ...ps };
          });
        }
      });
    }

    return () => {
      if (unset) unset();
    };
  }, [props.owner]);

  const createNewProject = (
    projectName: string,
    data: ITreeNode<NodeData>[] | null = null
  ) => {
    addNewProject({
      data: data || [{
        hasCaret: true,
        icon: "airplane",
        id: "0",
        isExpanded: true,
        isSelected: false,
        label: projectName,
        childNodes: [],
        nodeData: {
          MainType: "PROJECT",
          content: "",
          fileType: "null",
          id: "0",
          name: projectName,
          path: projectName
        }
      }],
      name: projectName,
      owner: props.owner || "testowner@gmail.com",
    })
      .then((data) => {
        // openProjectUsingId(data.id)
        editor.showMessage("Project created", "success");
      })
      .catch((reason) => {
        console.log("add new project error:", reason);
      });
  };

  const createNewProject_b = (project: Project) => {
    addNewProject({
      data: project.data,
      name: project.name,
      owner: props.owner || "testowner@gmail.com",
    })
      .then((data) => {
        editor.showMessage("Project created", "success");
      })
      .catch((reason) => {
        console.log("add new project error:", reason);
      });
  };

  const removeProject = (project: Project) => {
    deleteProject(project);
    if (state.currentProject?.id === project.id) {
      setState(ps => ({ ...ps, currentProject: null }))
      setOpenFiles([])
    }
  };

  const openProject = (project: Project) => {
    setState((ps) => ({ ...ps, currentProject: project }));
  };

  // const openProjectUsingId = (projectId: string) => {
  //   setState((ps) => ({ ...ps, currentProject: ps.projects.filter(p => p.id === projectId)[0] }));
  // };

  const setProjectData = () => {
    setState((ps) => {
      ps.projects.map((p) => {
        if (ps.currentProject) {
          if (p.id === ps.currentProject.id) {
            return ps.currentProject;
          } else {
            return p;
          }
        } else {
          return p;
        }
      });
      if (ps.currentProject) updateProjectData(ps.currentProject);
      return { ...ps };
    });
  };

  const addNewFolder = (path: number[], folderName: string) => {
    if (state.currentProject) {
      const parentPath = path.slice(1, path.length);
      let cn = (state.currentProject?.data as ITreeNode<{}>[])[0];
      if (parentPath.length !== 0) {
        parentPath.forEach((index) => {
          if (cn.childNodes !== undefined) {
            cn = cn.childNodes[index];
          } else {
            console.log("not");
          }
        });
      }

      cn.childNodes?.push({
        id: cn.childNodes.length || 0,
        icon: "folder-close",
        hasCaret: true,
        isExpanded: true,
        label: folderName,
        childNodes: [],
        nodeData: {
          MainType: "FOLDER",
          fileType: null,
          content: null,
          id: cn.childNodes.length || 0,
          path: "project/" + folderName,
          name: folderName,
        },
      });
      setProjectData();
    }
  };

  const closeCurrentProject = () => {
    setState(ps => ({ ...ps, currentProject: null }))
    setOpenFiles([])
  }

  const addNewFile = (
    path: number[],
    fileName: string,
    fileType: FileTypes
  ) => {
    if (state.currentProject) {
      const parentPath = path.slice(1, path.length);
      let cn = (state.currentProject?.data as ITreeNode<{}>[])[0];
      if (parentPath.length !== 0) {
        parentPath.forEach((index) => {
          if (cn.childNodes !== undefined) {
            cn = cn.childNodes[index];
          } else {
            console.log("not");
          }
        });
      }

      cn.childNodes?.push({
        id: cn.childNodes.length || 0,
        icon: "document",
        hasCaret: false,
        isExpanded: false,
        label: fileName + "." + fileType,
        childNodes: [],
        nodeData: {
          MainType: "FILE",
          fileType: fileType,
          content: "",
          id: cn.childNodes.length || 0,
          path: "project/" + fileName + "." + fileType,
          name: fileName,
        },
      });
      setProjectData();
    }
  };

  const deleteNode = (path: number[]) => {
    if (state.currentProject) {
      const parentPath = path.slice(1, path.length - 1);
      const nodeIndex = path[path.length - 1];
      let cn = (state.currentProject?.data as ITreeNode<{}>[])[0];
      if (parentPath.length !== 0) {
        parentPath.forEach((index) => {
          if (cn.childNodes !== undefined) {
            cn = cn.childNodes[index];
          } else {
            console.log("not");
          }
        });
      }

      cn.childNodes?.splice(nodeIndex, 1);
      setProjectData();
    }
  };

  const openFile = (path: number[]) => {
    console.log("open file:", path.toString());
    setOpenFiles((ps) => {
      if (
        ps.filter(
          (x) =>
            JSON.stringify([...x.path].sort()) ===
            JSON.stringify([...path].sort())
        ).length === 0
      ) {
        ps.forEach((f) => {
          f.isActive = false;
        });
        const node = getNode(path);
        ps.push({ node: node, path: path, isActive: true });
      }
      return [...ps];
    });
  };

  const saveFileContent = (path: number[], content: string) => {
    const node = getNode(path).nodeData as NodeData;
    node.content = content;
    setProjectData();
  };

  const setActiveFile = (path: number[]) => {
    setOpenFiles((ps) => {
      ps = openFiles.map((f) => {
        if (
          JSON.stringify([...f.path].sort()) ===
          JSON.stringify([...path].sort())
        ) {
          console.log("ok");
          return { ...f, isActive: true };
        } else {
          return { ...f, isActive: false };
        }
      });
      return [...ps];
    });
  };

  const closeFile = (path: number[]) => {
    setOpenFiles((ps) => {
      ps = ps.filter(
        (f) =>
          JSON.stringify([...f.path].sort()) !==
          JSON.stringify([...path].sort())
      );
      if (ps.length > 0) ps[ps.length - 1].isActive = true;
      return [...ps];
    });
  };

  const updateFileContent = (path: number[], content: string) => {
    console.log("path:", path, content);

    const node = getNode(path)?.nodeData as NodeData;
    if (node) node.content = content;
    setProjectData();
  };

  const getNode = (path: number[]): ITreeNode<NodeData> => {
    const parentPath = path.slice(1, path.length);
    let cn = (state.currentProject?.data as ITreeNode<NodeData>[])[0];
    if (parentPath.length !== 0) {
      parentPath.forEach((index) => {
        if (cn?.childNodes) {
          cn = cn.childNodes[index];
        }
      });
    }
    return cn;
  };

  return (
    <ProjectsContext.Provider
      value={{
        ...state,
        createNewProject,
        setActiveFile,
        removeProject,
        openProject,
        setProjectData,
        deleteNode,
        addNewFile,
        addNewFolder,
        openFile,
        saveFileContent,
        openFiles,
        updateFileContent,
        closeFile,
        createNewProject_b,
        closeCurrentProject
      }}
    >
      {props.children}
    </ProjectsContext.Provider>
  );
};

export const useProjects = (): IEditorContext => useContext(ProjectsContext);

interface IProjectProps {
  children: any;
}

export const Projects = (props: IProjectProps) => {
  const user = useUser();

  useEffect(() => {
    console.log("user email::", user.user?.email);
  }, [user.user?.email]);

  return (
    <ProjectsProvider owner={user.user?.uid}>{props.children}</ProjectsProvider>
  );
};
