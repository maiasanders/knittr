import { redirect } from "react-router"
import projectService from "../services/projectService"
import type { Route } from "./+types/variantRedirect"

export async function clientLoader({ params }: Route.LoaderArgs) {
    let project = await projectService.getTemplateProject(params.id)
        .then(r => {
            if (r.status === 200) return r.data
            if (r.status === 404) return null
        }).then(r => {
            if (r === null) return projectService.create({ variantId: params.id, isTemplate: true })
            return r
        })


    return redirect(`/projects/${project.projectId}/edit`)
}

export default function VariantRedirect() {
    return (<></>)
}
