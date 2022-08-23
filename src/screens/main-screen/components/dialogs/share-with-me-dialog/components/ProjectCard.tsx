import { RiDeleteBin6Line } from "react-icons/ri";
import { AiOutlineImport } from "react-icons/ai";
// import { useProjects } from "../../../../../../contexts/projects-context/ProjectsContext";
import "./project-card.scss";
import { Project } from "../../../../../../contexts/projects-context/ProjectsContext";
import React from "react";
import { Intent, Spinner } from "@blueprintjs/core";

interface IProps {
  project: Project;
  onImportProject: (project: Project) => void;
  onDelete: (project: Project) => void;
  loading: boolean;
}

const ProjectCard = (props: IProps) => {
  // const projects = useProjects();

  return (
    <div className="share-with-me-project-card">
      <div>
        <div className="share-with-me-project-name">
          Project Id: {props.project.id}
        </div>
        <div className="share-with-me-project-name">
          Project Name: {props.project.name}
        </div>
      </div>

      <div className="share-with-me-project-card-actions">
        {props.loading ? <Spinner intent={Intent.PRIMARY} size={Spinner.SIZE_SMALL} /> : <><RiDeleteBin6Line onClick={() => {
          props.onDelete(props.project)
        }} />
          <AiOutlineImport
            onClick={() => {
              props.onImportProject(props.project);
            }}
          /></>}


      </div>

    </div>

  );
};

export default ProjectCard;
