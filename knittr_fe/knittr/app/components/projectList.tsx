import { Project } from "../helpers/apiResponseTypes"
import ProjectItem from "./projectItem/projectItem"


const ProjectList = ({ projects }: { projects: Project[], isAuthor: boolean }) => {
    return (
        <ul className="card-list">
            {projects.map(project => (<ProjectItem key={project.projectId} project={project} />))}
        </ul>
    )
}

export default ProjectList
