import projectService from "../services/projectService"
import type { Route } from "./+types/projectLayout"

export async function clientLoader({ params }: { params: Route.LoaderArgs }) {
    const project = await projectService.getTemplateProject(params.id).then(r => r.data)
    return { project }
    // TODO error handling
}

export default function ProjectLayout({ loaderData }: Route.LoaderArgs) {

}
