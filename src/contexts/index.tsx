import React from "react";
import { EditorProvider } from "./editor-context/EditorContext";
import { Projects } from "./projects-context/ProjectsContext";
import { UserProvider } from "./user-context/UserContext";

interface IProps {
  children: any;
}

const AppContexts = (props: IProps) => {
  return (
    <EditorProvider>
      <UserProvider>
        <Projects>{props.children}</Projects>
      </UserProvider>
    </EditorProvider>
  );
};

export default AppContexts;
