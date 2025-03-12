import { redirect } from "react-router"
import projectService from "../services/projectService"
import type { Route } from "./+types/variantRedirect"

export async function clientLoader({ params }: Route.LoaderArgs) {
    const project = await projectService.getTemplateProject(params.id).then(r => r.data)
    return redirect(`/projects/${project.projectId}/edit`)
}

export default function VariantRedirect() {
    return (<></>)
}
