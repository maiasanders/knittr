import { useEffect, useState } from "react";
import ProjectList from "../components/projectList";
import SavedTabs from "../components/savedTabs";
import { Project } from "../helpers/apiResponseTypes";
import projectService from "../services/projectService";

const ProjectsListPage = () => {
    const [projects, setProjects] = useState<Project[]>([])

    useEffect(() => {
        projectService.getCurrent()
            .then(res => setProjects(res.data))
    })

    return (
        <main>
            <SavedTabs />
            <ProjectList isAuthor={false} projects={projects} />
        </main>
    )
}
export default ProjectsListPage
