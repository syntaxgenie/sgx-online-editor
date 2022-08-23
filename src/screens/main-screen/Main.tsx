import React, { useState } from "react";
import "./main.scss";
import Editor from "./components/editor/Editor";
import MenuBar from "./components/menu-bar/MenuBar";
import OutPutContainer from "./components/output-container/OutPutContainer";
import ActionBar from "./components/action-bar/ActionBar";
import MainDialog, {
  ActiveTab,
} from "./components/dialogs/main-dialog/MainDialog";
import ShareWithMeDialog from "./components/dialogs/share-with-me-dialog/ShareWithMeDialog";
// import { useUser } from "../../contexts/user-context/UserContext";

const Main = () => {
  // const user = useUser();

  // const [showNewFileDialog, setShowNewFileDialog] = useState(false);
  const [showProjectDialog, setShowProjectDialog] = useState(false);
  const [showNotificationDialog, setShowNotificationDialog] = useState(false);



  const [activeTab, setActiveTab] = useState(ActiveTab.MY_PROJECTS);

  return (
    <div>
      <MenuBar
        onNewFile={() => {}}
        onMyProjectsClick={() => {
          setActiveTab(ActiveTab.MY_PROJECTS);
          setShowProjectDialog(true);
        }}
        onImportProjectClick={() => {
          setActiveTab(ActiveTab.IMPORT_PROJECT);
          setShowProjectDialog(true);
        }}
        onNotificationIconClick={() => setShowNotificationDialog(true)}
      />
      {/* {viewMenuBar()} */}
      <div className="main-content">
        <ActionBar />
        <Editor />
        <OutPutContainer />
      </div>
      <MainDialog
        show={showProjectDialog}
        activeTab={activeTab}
        onClose={() => {
          console.log("ok")
          setShowProjectDialog(false)}}
      />
      <ShareWithMeDialog
        onClose={() => setShowNotificationDialog(false)}
        show={showNotificationDialog}
      />
    </div>
  );
};

export default Main;
