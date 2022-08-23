import "./share-with-me-dialog.scss";
import DefalutDialog from "../../../../../ui-components/default-dialog/DefaultDialog";
import ProjectCard from "./components/ProjectCard";
import { useUser } from "../../../../../contexts/user-context/UserContext";
import { useProjects } from "../../../../../contexts/projects-context/ProjectsContext";
import { useState } from "react";

interface IProps {
  show: boolean;
  onClose: () => void;
}
const ShareWithMeDialog = (props: IProps) => {
  const user = useUser();
  const projects = useProjects();
  const [loading,setLoading] = useState(false);

  return (
    <DefalutDialog
      isOpen={props.show}
      onClose={props.onClose}
      title="Notifications"
    >
      <div className="share-with-me-dialog-content">
        {user.sharedProjects.map((p, index) => {
          return (
            <ProjectCard
              key={index}
              project={p}
              loading={loading}
              onImportProject={(project) => {
                setLoading(true);
                projects.createNewProject(project.name, project.data);
                user
                  .removeSharedProjectFromList(project)
                  .then(() => {
                    props.onClose();
                  })
                  .catch((error) => {
                    console.log(
                      "shared project id deletion failted with",
                      error
                    );
                  }).finally(()=>{setLoading(false)});
              }}
              onDelete={(project) => {

                if (user.user?.uid && project.id) {
                  setLoading(true);
                  user
                    .removeSharedProjectFromList(project)
                    .then(() => {
                      props.onClose();
                    })
                    .catch((error) => {
                      console.log(
                        "shared project id deletion failted with",
                        error
                      );
                    }).finally(()=>{setLoading(false)});;
                } else {
                  console.log("error deletion");
                }
              }}
            />
          );
        })}
      </div>
    </DefalutDialog>
  );
};

export default ShareWithMeDialog;
