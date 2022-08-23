import { useProjects } from "../../../../../../../../contexts/projects-context/ProjectsContext";
import { MdClose } from "react-icons/md"
interface IProps {
  name: string;
  path: number[];
  isActive: boolean;
}

const EditorTab = (props: IProps) => {
  const { closeFile } = useProjects();
  const { setActiveFile } = useProjects();
  return <div className={props.isActive ? "editor-tab-active" : "editor-tab"} onClick={() => {
    setActiveFile(props.path)

  }} >{props.name}
    <MdClose onClick={(e) => {
      e.stopPropagation();
      closeFile(props.path)
    }} />
  </div>;
};

export default EditorTab;
