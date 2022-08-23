import { RiDeleteBin6Line } from "react-icons/ri";
import { IoMdOpen } from "react-icons/io";
import { Project, useProjects } from "../../../../../../../../../contexts/projects-context/ProjectsContext";

interface IProps {
  project: Project;
  onOpenProject: () => void;
}

const ProjectCard = (props: IProps) => {
  const projects = useProjects();

  return (
    <div className="project-card">
      <div className="project-name">
        {props.project.name} 
      </div>
      <div className="project-card-actions">
        <RiDeleteBin6Line
          onClick={() => projects.removeProject(props.project)}
        />
        <IoMdOpen
          onClick={() => {
            projects.openProject(props.project);
            props.onOpenProject();
          }}
        />
      </div>
    </div>
  );
};

export default ProjectCard;
