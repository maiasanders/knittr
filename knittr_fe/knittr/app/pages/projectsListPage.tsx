import ProjectList from "../components/projectList";
import projectService from "../services/projectService";
import type { Route } from "../+types/root";
import { Link } from "react-router";

export async function clientLoader() {
    const projects = await projectService.getCurrent().then(r => r.data)
    return { projects }
}

const ProjectsListPage = ({ loaderData }: Route.ComponentProps) => {

    const { projects } = loaderData

    return (
        <div className="saved-and-mine">
            {projects.length > 0 ? (
                <ProjectList isAuthor={false} projects={projects} />
            ) : (<p>
                You have started any projects yet! <Link to="/patterns/discover">Check out some patterns</Link> to start one!
            </p>)}
        </div>
    )
}
export default ProjectsListPage
