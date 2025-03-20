import ProjectList from "../components/projectList";
import projectService from "../services/projectService";
import type { Route } from "../+types/root";

export async function clientLoader() {
    const projects = await projectService.getCurrent().then(r => r.data)
    return { projects }
}

const ProjectsListPage = ({ loaderData }: Route.ComponentProps) => {

    const { projects } = loaderData

    return (
        <>
            <ProjectList isAuthor={false} projects={projects} />
        </>
    )
}
export default ProjectsListPage
