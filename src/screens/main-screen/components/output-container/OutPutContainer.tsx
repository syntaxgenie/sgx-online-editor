import React from "react";
import OutputToolBar from "./putput-toolbar/OutputToolbar";


const OutPutContainer = () => {
  return (
    <div className="output-container-wraper">
      <OutputToolBar />
      <div className="oc-1">
        <strong>user/projects &#62;</strong>  npm run build
        <div className="mt-2">
          Building project...
        </div>
      </div>
      <div className="oc-2"></div>
      <div className="oc-3"></div>
    </div>
  );
};

export default OutPutContainer;
