import { useState } from "react";
import { Project, ProjectStartDto, VariantDto } from "../helpers/apiResponseTypes";
import projectService from "../services/projectService";

const useVariant = () => {
    const [project, setProject] = useState<Project>();

    const startProject = async (dto: ProjectStartDto) => {
        await projectService.create(dto).then(res => setProject(res.data))
        return project;
    }

    return { startProject, project }
}

export default useVariant;
