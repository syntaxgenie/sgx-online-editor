import "./new-folder-dialog.scss";
import DefalutDialog from "../../../../../ui-components/default-dialog/DefaultDialog";
import React, { useState } from "react";
import { Button, InputGroup } from "@blueprintjs/core";
// import { useProjects } from "../../../../../contexts/projects-context/ProjectsContext";

interface IProps {
  show: boolean;
  onClose: () => void;
  onCreate: (folderName: string) => void;
}

const NewFolderDialog = (props: IProps) => {
  // const projects = useProjects();
  const [state, setState] = useState("");

  return (
    <DefalutDialog isOpen={props.show} onClose={props.onClose} width={374}>
      <div className="new-folder-dialog-content">
        <div className="nf-input">
          <InputGroup
            id="folderName"
            onChange={(e) => setState(e.target.value)}
            value={state}
            placeholder="Folder Name"
          />
        </div>
        <div className="actions">
          <Button
            small
            style={{ marginLeft: "5px", marginRight: "5px" }}
            onClick={() => {
              props.onCreate(state);
              setState("")
            }}
          >
            Create
          </Button>
          {/* <Button small>Cancel</Button> */}
        </div>
      </div>
    </DefalutDialog>
  );
};

export default NewFolderDialog;
