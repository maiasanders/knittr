import { data } from "react-router"
import { Project } from "../helpers/apiResponseTypes"
import projectService from "../services/projectService"
import type { Route } from "./+types/projectPage"
import { useState } from "react"
import Modal from "react-bootstrap/Modal"

export async function clientLoader({ params }: { params: Route.LoaderArgs }) {
    const project = await projectService.getById(params.id).then(r => r.data)

    if (!project) throw data("Project Not Found", { status: 404 });

    return { project }
}


export default function ProjectPage({ loaderData }: Route.LoaderArgs<Project>) {

    return (<>

    </>)
}
