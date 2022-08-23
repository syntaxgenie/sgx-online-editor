import {
  Alignment,
  Button,
  Menu,
  MenuDivider,
  MenuItem,
  Navbar,
  Popover,
  Position,
} from "@blueprintjs/core";
import { useEffect, useMemo, useState } from "react";
import { useHistory } from "react-router";
import { useProjects } from "../../../../contexts/projects-context/ProjectsContext";
import { useUser } from "../../../../contexts/user-context/UserContext";
import logo from "../../../../resources/images/Shape.png";
import PrimaryButton from "../../../../ui-components/primary-button/PrimaryButton";
import ShareProjectDialog from "../dialogs/share-project-dialog/ShareProjectDialog";
import { MdNotifications } from "react-icons/md";
import "./menu-bar.scss";

interface IProps {
  onNewFile: () => void;
  onMyProjectsClick: () => void;
  onImportProjectClick: () => void;
  onNotificationIconClick: () => void;
}

const MenuBar = (props: IProps) => {
  const user = useUser();
  const history = useHistory();
  const projects = useProjects();

  const [showShareProjectDialog, setShareProjectDialog] = useState<boolean>(
    false
  );

  const exampleMenu = (
    <Menu>
      <MenuItem text="My Projects" onClick={props.onMyProjectsClick} />
      <MenuDivider />
      <MenuItem text="Import Project" onClick={props.onImportProjectClick} />
      <MenuDivider />
      <MenuItem text="Save" />
      <MenuItem text="Save As" />
      <MenuItem text="Save All" />
    </Menu>
  );

  const { onNotificationIconClick } = props;

  const viewNotifications = useMemo(() => {
    return () => {
      if (user.isAuth && user.sharedProjects.length > 0) {
        return (
          <div
            className="notification-button"
            onClick={() => onNotificationIconClick()}
          >
            <span className="n-label">{user.sharedProjects.length}</span>
            <MdNotifications />
          </div>
        );
      } else {
        return <></>;
      }
    };
  }, [user.sharedProjects, onNotificationIconClick, user.isAuth]);

  useEffect(() => {
    console.log("l s p", user.sharedProjects, user.sharedProjects.length);
  }, [user.sharedProjects]);

  return (
    <>
      <Navbar
        style={{
          height: "70px",
          backgroundColor: "#27414F",
          boxShadow: "none",
        }}
      >
        <Navbar.Group align={Alignment.LEFT} style={{ height: "70px" }}>
          <Navbar.Heading>
            <img src={logo} alt="" style={{ transform: "scale(0.7)" }} />
          </Navbar.Heading>
          <Popover content={exampleMenu} position={Position.BOTTOM}>
            <Button className="bp3-minimal" text="File" />
          </Popover>
          <Button className="bp3-minimal" text="Edit" />
          <Button className="bp3-minimal" text="Sections" />
          <Button className="bp3-minimal" text="View" />
          <Button className="bp3-minimal" text="Go" />
          <Button className="bp3-minimal" text="Run" />
          <Button className="bp3-minimal" text="Terminal" />
          <Button className="bp3-minimal" text="Help" />
        </Navbar.Group>
        <Navbar.Group align={Alignment.RIGHT} style={{ height: "70px" }}>
          {user.isAuth && (
            <div className="dn-and-un-wrapper">
              <label className="display-name">{user.user?.displayName}</label>
              <label className="user-name">{user.userName}</label>
            </div>
          )}
          {user.isAuth && user.user?.photoURL && (
            <img
              src={user.user?.photoURL}
              className="avator-image"
              alt="user avator"
            />
          )}
          {user.isAuth && (
            <PrimaryButton
              onClick={() => {
                user.signOut();
              }}
              text="Sign out"
            />
          )}
          {user.isAuth === false && (
            <PrimaryButton
              onClick={() => history.push("login")}
              text="Sign in"
            />
          )}

          {user.isAuth && projects.currentProject && (
            <PrimaryButton
              onClick={() => setShareProjectDialog(true)}
              text="Share"
            />
          )}

          {viewNotifications()}
        </Navbar.Group>
      </Navbar>
      <ShareProjectDialog
        show={showShareProjectDialog}
        onClose={() => setShareProjectDialog(false)}
      />
    </>
  );
};

export default MenuBar;
