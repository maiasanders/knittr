import ProjectList from "../components/projectList";
import projectService from "../services/projectService";
import type { Route } from "../+types/root";

export async function clientLoader({ params }: Route.LoaderArgs) {
    const projects = await projectService.getCurrent().then(r => r.data)
    return { projects }
}

const ProjectsListPage = ({ loaderData }: Route.ComponentProps) => {
    // const [projects, setProjects] = useState<Project[]>([])

    // useEffect(() => {
    //     projectService.getCurrent()
    //         .then(res => setProjects(res.data))
    // }, [])

    const { projects } = loaderData

    return (
        <main>
            <ProjectList isAuthor={false} projects={projects} />

        </main>
    )
}
export default ProjectsListPage
