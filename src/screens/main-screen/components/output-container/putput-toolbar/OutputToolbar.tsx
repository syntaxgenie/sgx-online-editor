import "./toolbar.scss";
import runIcon from  "../../../../../resources/images/run.svg"
import stopIcon from "../../../../../resources/images/stop.svg"

const OutputToolBar = () => {
  return <div className="output-toolbar">
    <img className="ot-item" src={runIcon} alt=""/>
    <img className="ot-item" src={stopIcon} alt=""/>
  </div>;
};

export default OutputToolBar;