import "./new-file-dialog.scss";
import DefalutDialog from "../../../../../ui-components/default-dialog/DefaultDialog";
import PrimaryButton from "../../../../../ui-components/primary-button/PrimaryButton";
// import { AiOutlineSearch, AiOutlineUpload } from "react-icons/ai";
// import { IoMdAdd } from "react-icons/io";
import React, { useEffect, useMemo, useState } from "react";
import NewFileContainer from "./components/new-file/NewFileContainer";
// import ExploreContainer from "./components/explore/ExploreContainer";
import MyProjectContainer from "./components/my-projects/MyProjectContainer";
import { useUser } from "../../../../../contexts/user-context/UserContext";
import ExportProjectContainer from "./components/export-project/ExportProjectContainer";
import ImportProjectContainer from "./components/import-project/ImportProjectContainer";
import ImportExportFile from "./components/import-export-file/ImportExportFile";
interface IProps {
  show: boolean;
  activeTab: ActiveTab;
  onClose: () => void;
  onCreate?: (fileName: string, fileType: FileTypes) => void;
}

export enum FileTypes {
  GLSL = "glsl",
  JAVASCRIPT = "js",
  RUST = "st",
  JAVA = "java",
  GO = "go",
  HTML = "html",
  default = "",
}

export enum ActiveTab {
  MY_PROJECTS,
  NEW_FILE,
  IMPORT_PROJECT,
  EXPORT_PROJECT,
  IMPORT_EXPORT_FILE
}

const MainDialog = (props: IProps) => {
  const user = useUser();
  const [activeTab, setActiveTab] = useState<ActiveTab>(props.activeTab);

  useEffect(() => {
    setActiveTab(props.activeTab);
  }, [props.activeTab, props.show]);

  const {onClose,onCreate} = props;

  const displayActiveTab = useMemo(() => {
    return () => {
      switch (activeTab) {
        case ActiveTab.NEW_FILE:
          return (
            <NewFileContainer
              onClose={onClose}
              onCreate={onCreate}
            />
          );
        case ActiveTab.MY_PROJECTS:
          return <MyProjectContainer onClose={onClose} />;
        case ActiveTab.IMPORT_PROJECT:
          return <ImportProjectContainer onFinsh={()=>onClose()} />;
        case ActiveTab.IMPORT_EXPORT_FILE:
          return <ImportExportFile  />;
        default:
          return <ExportProjectContainer />;
      }
    };
  }, [onClose,onCreate,activeTab]);

  return (
    <DefalutDialog isOpen={props.show} onClose={props.onClose}>
      <div className="new-file-dialog-content">
        <div className="nfd-menu">
          {!user.isAuth && (
            <div style={{ width: "130px" }}>
              <PrimaryButton onClick={() => {}} text="Sign in" />
            </div>
          )}

          <div
            className={`nfdm-item ${
              activeTab === ActiveTab.MY_PROJECTS ? "nfdm-item-active" : ""
            }`}
            onClick={() => setActiveTab(ActiveTab.MY_PROJECTS)}
          >
            {/* <IoMdAdd /> */}
            Create a Project
          </div>
          <div
            className={`nfdm-item ${
              activeTab === ActiveTab.NEW_FILE ? "nfdm-item-active" : ""
            }`}
            onClick={() => setActiveTab(ActiveTab.NEW_FILE)}
          >
            {/* <IoMdAdd /> */}
            Create a File
          </div>
          <div
            className={`nfdm-item ${
              activeTab === ActiveTab.IMPORT_PROJECT ? "nfdm-item-active" : ""
            }`}
            onClick={() => setActiveTab(ActiveTab.IMPORT_PROJECT)}
          >
            {/* <AiOutlineUpload /> */}
            Import a Project
          </div>
          <div
            className={`nfdm-item ${
              activeTab === ActiveTab.IMPORT_EXPORT_FILE ? "nfdm-item-active" : ""
            }`}
            onClick={() => setActiveTab(ActiveTab.IMPORT_EXPORT_FILE)}
          >
            {/* <AiOutlineUpload /> */}
            Import/Export File
          </div>
          <div
            className={`nfdm-item ${
              activeTab === ActiveTab.EXPORT_PROJECT ? "nfdm-item-active" : ""
            }`}
            onClick={() => setActiveTab(ActiveTab.EXPORT_PROJECT)}
          >
            {/* <AiOutlineUpload /> */}
            Export a Project
          </div>
        </div>
        <div className="ndf-content">{displayActiveTab()}</div>
      </div>
    </DefalutDialog>
  );
};

export default MainDialog;
