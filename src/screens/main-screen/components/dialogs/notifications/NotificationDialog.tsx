import "./notification-dialog.scss";
import DefalutDialog from "../../../../../ui-components/default-dialog/DefaultDialog";
import React, { useState } from "react";
import { Button, InputGroup, Tag } from "@blueprintjs/core";
import { useProjects } from "../../../../../contexts/projects-context/ProjectsContext";
// import { useProjects } from "../../../../../contexts/projects-context/ProjectsContext";

interface IProps {
  show: boolean;
  onClose: () => void;
}
const NotificationDialog = (props: IProps) => {
  const projects = useProjects();
  const [state, setState] = useState("");
  const [users, setUsers] = useState<string[]>(["test-username", "test-username", "test-username", "test-username", "test-username", "test-username", "test-username"]);
  return (
    <DefalutDialog isOpen={props.show} onClose={props.onClose} title="Share Project">
      <div className="project-share-content">
        <label className="mb-2">Project Name: {projects.currentProject?.name}</label>
        <div className="nf-input">
          <InputGroup
            id="folderName"
            onChange={(e) => setState(e.target.value)}
            value={state}
            placeholder="UserName"
          />
          <Button
            small
            className="ml-2"
            onClick={() => {
              if (users.filter(u => u === state).length === 0) {
                setUsers(ps => {
                  ps.push(state)
                  return [...ps]
                })
                setState("")
              }
            }}
          >
            add user
          </Button>
        </div>
        <div className="user-tags-wrapper">
          {users.map((userName, index) => (<Tag
            key={index}
            className="user-tag"
            onRemove={(e) => {
              setUsers(ps => {
                ps = ps.filter(u => u !== userName);
                return [...ps]
              })
            }}
            icon="user"
          >
            {userName}
          </Tag>))}
        </div>
        <div className="actions text-right mt-2">
          <Button
            onClick={() => {
              // props.onCreate(state);
              // setState("")
            }}
          >
            Share
          </Button>
          {/* <Button small>Cancel</Button> */}
        </div>
      </div>
    </DefalutDialog>
  );
};

export default NotificationDialog;
