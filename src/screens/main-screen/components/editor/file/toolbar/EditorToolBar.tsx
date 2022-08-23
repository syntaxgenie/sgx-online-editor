import EditorActionContainer from "./action-container/EditorActionContainer";
import EditorTabContainer from "./tab-container/EditorTabContainer";
import "./toolbar.scss";

const EditorToolBar = () => {
  return <div className="editor-toolbar">
    <EditorTabContainer/>
    <EditorActionContainer/>
  </div>;
};

export default EditorToolBar;
