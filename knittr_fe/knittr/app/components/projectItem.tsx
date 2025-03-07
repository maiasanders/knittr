import { Project } from "../helpers/apiResponseTypes";
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'


const ProjectItem = ({ project }: { project: Project }) => {



    // TODO replace default url
    // TODO replace w/ vite logo w/ fallback image

    return (
        <li>
            {/* TODO add element for project page */}
            <Link to={`/projects/${project.projectId}`}>
                {project.pattern.defaultImage ? (<img
                    src={project.pattern.defaultImage.imageLink}
                    alt={project.pattern.defaultImage.desc}
                />) : (<img src={'./vite.svg'} />)}
                <h4>{project.pattern.name}</h4>
                <FontAwesomeIcon icon={faXmark} />
            </Link>
        </li>
    )
}

export default ProjectItem
