import { Project } from "../helpers/apiResponseTypes";
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark, faPenToSquare } from '@fortawesome/free-solid-svg-icons'


const ProjectItem = ({ project, isAuthor }: { project: Project, isAuthor: boolean }) => {
    let yarnSizeInfo: string | undefined;
    if (project.yarn && project.size.sizeId !== 1) {
        yarnSizeInfo = `${project.size.name}, ${project.yarn.name}`
    } else if (project.yarn) {
        yarnSizeInfo = project.yarn.name
    } else if (project.size.sizeId !== 1) {
        yarnSizeInfo = project.size.name
    }



    return (
        <li>
            {/* TODO add element for project page */}
            <Link to={`/projects/${project.projectId}`}>
                <img
                    src={project.pattern.defaultImage.imageLink}
                    alt={project.pattern.defaultImage.desc}
                />
                <h4>{project.pattern.name}</h4>
                {yarnSizeInfo ? (<h5>{yarnSizeInfo}</h5>) : null}
                <FontAwesomeIcon icon={isAuthor ? faPenToSquare : faXmark} />
            </Link>
        </li>
    )
}

export default ProjectItem
