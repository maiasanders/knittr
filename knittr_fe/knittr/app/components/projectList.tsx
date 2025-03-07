import { Project } from "../helpers/apiResponseTypes"
import ProjectItem from "./projectItem"


const ProjectList = ({ projects, isAuthor }: { projects: Project[], isAuthor: boolean }) => {
    return (
        <ul>
            {projects.map(project => (<ProjectItem key={project.projectId} project={project} />))}
        </ul>
    )
}

export default ProjectList
