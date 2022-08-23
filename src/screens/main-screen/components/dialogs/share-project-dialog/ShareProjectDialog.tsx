import "./share-project-dialog.scss";
import DefalutDialog from "../../../../../ui-components/default-dialog/DefaultDialog";
import React, { useState } from "react";
import {
  Button,
  Divider,
  InputGroup,
  Intent,
  ProgressBar,
  Tag,
} from "@blueprintjs/core";
import { useProjects } from "../../../../../contexts/projects-context/ProjectsContext";
import { copyToClipboard } from "../../../../../utils/Utiles";
import { useEditor } from "../../../../../contexts/editor-context/EditorContext";
import { firenaseFunction, firestore as db } from "../../../../..";
import { COLLECTIONS } from "../../../../../firebase/firestore/Firestore";
// import { useProjects } from "../../../../../contexts/projects-context/ProjectsContext";

interface IProps {
  show: boolean;
  onClose: () => void;
}
const ShareProjectDialog = (props: IProps) => {
  const editor = useEditor();

  const projects = useProjects();
  const [state, setState] = useState("");
  const [users, setUsers] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const shareProjectFunction = firenaseFunction.httpsCallable("shareProject");

  const addUser = (userName: string) => {
    if (state.length > 0) {
      db.collection(COLLECTIONS.USERS)
        .where("userName", "==", userName)
        .get()
        .then((qs) => {
          if (!qs.empty) {
            // const user =qs.docs[0].data();
            setUsers((ps) => {
              const x = ps.filter((u) => u === state).length === 0;
              if (x && state.length > 0) ps.push(state);
              return [...ps];
            });
          } else {
            editor.showMessage("User name is not available.", "danger");
          }
          setState("");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <DefalutDialog
      isOpen={props.show}
      onClose={props.onClose}
      title="Share Project"
    >
      <div className="project-share-content">
        <div className="project-infor">
          <label className="mb-2">
            Project Name: {projects.currentProject?.name}
          </label>
          <br />
          <label className="mb-2 project-id">
            Project Id: <span>{projects.currentProject?.id}</span>
          </label>
          {" | "}
          <label
            className="copy-button"
            onClick={() => {
              copyToClipboard(projects.currentProject?.id || "null");
              editor.showMessage(
                "Project id was copied to clipboard",
                "success"
              );
            }}
          >
            Copy
          </label>
        </div>
        <Divider style={{ marginRight: 0, marginLeft: 0 }} />
        <div className="add-users-container">
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
                addUser(state);
              }}
            >
              add user
            </Button>
          </div>
          <div className="user-tags-wrapper">
            {users.map((userName, index) => (
              <Tag
                key={index}
                className="user-tag"
                onRemove={(e) => {
                  setUsers((ps) => {
                    ps = ps.filter((u) => u !== userName);
                    return [...ps];
                  });
                }}
                icon="user"
              >
                {userName}
              </Tag>
            ))}
          </div>
          <div className="actions text-right mt-2">
            {loading ? (
              <ProgressBar intent={Intent.PRIMARY} />
            ) : (
              <Button
                onClick={() => {
                  if (projects.currentProject?.id) {
                    setLoading(true);
                    shareProjectFunction({
                      projectId: projects.currentProject.id,
                      userNames: users,
                    })
                      .then(() => {
                        setUsers([]);
                        setState("");
                        editor.showMessage("Project was shared.", "success");
                        props.onClose();
                      })
                      .catch((error) => {
                        console.log("function error:", error);
                      })
                      .finally(() => {
                        setLoading(false);
                      });
                  }
                }}
              >
                Share
              </Button>
            )}
            {/* <Button small>Cancel</Button> */}
          </div>
        </div>
      </div>
    </DefalutDialog>
  );
};

export default ShareProjectDialog;
