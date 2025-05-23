import { Project } from "../../helpers/apiResponseTypes";
import { Link } from 'react-router-dom'

const ProjectItem = ({ project }: { project: Project }) => {
    // TODO add in delete functionality
    // TODO add in percentage completed?

    return (
        <li className="pattern-card">
            {/* <ClickableIcon icon={faXmark} handleClick={() => { }} /> */}
            <Link to={`/projects/${project.projectId}`} className="card-content">
                {project.pattern.defaultImage ? (<img
                    src={project.pattern.defaultImage.imageLink}
                    alt={project.pattern.defaultImage.desc}
                />) : (<img src={'./placeholder.svg'} />)}
                <h4>{project.pattern.name}</h4>
            </Link>
        </li>
    )
}

export default ProjectItem
