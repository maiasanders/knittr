import { Project } from "../helpers/apiResponseTypes"
import ProjectItem from "./projectItem/projectItem"


const ProjectList = ({ projects }: { projects: Project[] }) => {
    return (
        <ul className="card-list saved-and-mine">
            {projects.map(project => (<ProjectItem key={project.projectId} project={project} />))}
        </ul>
    )
}

export default ProjectList
