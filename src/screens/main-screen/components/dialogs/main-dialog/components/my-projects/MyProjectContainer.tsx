import { Button, InputGroup } from '@blueprintjs/core';
import React, { useState } from 'react'
import { useProjects } from '../../../../../../../contexts/projects-context/ProjectsContext';
import DefaultButton from '../../../../../../../ui-components/default-button/DefaultButton';
import ProjectCard from './components/project-card/ProjectCard';
import './new-project-dialog.scss'
interface IProps {
    onClose: () => void;
}

const MyProjectContainer = (props: IProps) => {
    const projects = useProjects();
    const [state, setState] = useState("");
    return <div className="my-project-dialog-content">
        <div className="project-list">
            {projects.projects.map((project,index) => (
                <ProjectCard key={index} project={project} onOpenProject={() => props.onClose()} />
            ))}
        </div>
        <div>
            <div className="add-new-project-from">
                <div className="a-text">
                    <InputGroup
                        id="projectName"
                        onChange={(e) => setState(e.target.value)}
                        value={state}
                        placeholder="Project Name"
                    />
                </div>
                <div className="a-button">
                    <Button
                        onClick={() => {
                            if (state.trim().length !== 0) {
                                projects.createNewProject(state);
                                setState("")
                            }

                        }}
                    >
                        Create Project
        </Button>
                </div>
            </div>
            <div className="project-actions">
                <DefaultButton text="Cancel" onClick={() => props.onClose()} />
            </div>
        </div>

    </div>

}

export default MyProjectContainer;