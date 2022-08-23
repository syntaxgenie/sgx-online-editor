import FileExplore from "./file-explore/FileExplore";
import newFileIcon from "../../../../resources/images/file.svg";
import searchIcon from "../../../../resources/images/search.svg";
import gitIcon from "../../../../resources/images/git.svg";
import userIcon from "../../../../resources/images/user.svg";
import settingsIcon from "../../../../resources/images/settings.svg";

const ActionBar = () => {
  return (
    <div className="action-wrapper">
      <div className="action-bar">
        <div className="action-bar-menu-group">
          <div className="action-bar-menu-item">
            <img src={newFileIcon} alt="" />
          </div>
          <div className="action-bar-menu-item">
            <img src={searchIcon} alt="" />
          </div>
          <div className="action-bar-menu-item">
            <img src={gitIcon} alt="" />
          </div>
        </div>
        <div className="action-bar-menu-group">
          <div className="action-bar-menu-item">
            <img src={userIcon} alt="" />
          </div>
          <div className="action-bar-menu-item">
            <img src={settingsIcon} alt="" />
          </div>
        </div>
      </div>
      <div className="action-content">
        <FileExplore />
      </div>
    </div>
  );
};

export default ActionBar;
