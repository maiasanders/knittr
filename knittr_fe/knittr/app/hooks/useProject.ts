import { useEffect, useState } from "react"
import { Project, ProjectStartDto } from "../helpers/apiResponseTypes"
import projectService from "../services/projectService"
import { redirect } from "react-router-dom"

const useProject = (id: number) => {
    const [project, setProject] = useState<Project>();
    const [newProject, setNewProject] = useState<Project>();

    useEffect(() => {
        const getProject = async () => {
            try {
                projectService.getById(id)
                    .then((res) => {
                        if (res.status === 200) {
                            setProject(res.data)
                        } else {
                            throw redirect('/404')
                        }
                    })
            } catch {
                // TODO throw error
            }
        }

        getProject()
    })



    return { project }
}

export default useProject
