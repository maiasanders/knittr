import { useEffect, useState } from "react"
import { Project, } from "../helpers/apiResponseTypes"
import projectService from "../services/projectService"
import { redirect } from "react-router-dom"

// TODO should be able to delete this module
const useProject = (id: number) => {
    const [project, setProject] = useState<Project>();

    useEffect(() => {
        const getProject = async () => {
            projectService.getById(id)
                .then((res) => {
                    if (res.status === 200) {
                        setProject(res.data)
                    } else {
                        throw redirect('/404')
                    }
                })
        }

        getProject()
    })



    return { project }
}

export default useProject
