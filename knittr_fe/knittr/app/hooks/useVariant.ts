import { useEffect, useState } from "react";
import { Project, ProjectStartDto } from "../helpers/apiResponseTypes";
import projectService from "../services/projectService";

const useVariant = () => {
    const [projectId, setProjectId] = useState(0)
    const [project, setProject] = useState<Project>();

    const startProject = async (dto: ProjectStartDto) => {
        await projectService.create(dto).then(res => setProject(res.data))
        return project;
    }

    useEffect(() => {
        const getProject = async () => {
            await projectService.getById(projectId).then(r => setProject(r.data))
        }
        getProject()
    }, [projectId])

    return { startProject, project }
}


export default useVariant;
