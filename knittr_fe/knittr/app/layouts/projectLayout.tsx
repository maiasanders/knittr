import { ChangeEvent, useState } from "react";
import { Project } from "../helpers/apiResponseTypes";
import ProjectHeader from "../components/projectHeader/projectHeader";
import NotesSection from "../components/notesSection/notesSection";
import useViewport from "../hooks/useViewport";
import DisplayNotesButton from "../components/displayNotesButton";
import StitchCounter from "../components/stitchCounter/stitchCounter";
import { Outlet, redirect, useNavigate } from "react-router-dom";
import type { Route } from "./+types/projectLayout";
import projectService from "../services/projectService";
import "./projectLayout.css"
import ClickableIcon from "../components/clickableIcon";
import { faArrowLeft, faEye } from "@fortawesome/free-solid-svg-icons";
import StepAccordion from "../components/stepAccordion/stepAccordion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export async function clientLoader({ params }: { params: Route.LoaderArgs }) {

    const project = await projectService.getById(params.id).then(r => r.data)
    return { project }

}

const EditPatternPage = ({ loaderData }: Route.LoaderArgs<Project>) => {

    const viewport = useViewport()
    const { project } = loaderData
    const navigate = useNavigate();

    // TODO add in cloudinary for image upload ??

    const pattern = project.pattern
    if (project === undefined) throw redirect('/404')

    const [currentRow, setCurrentRow] = useState(project.currentRow)
    const [countStep, setCountStep] = useState(1)

    const [showNotes, setShowNotes] = useState(false)

    const handleStitch = () => {
        projectService.updateProgess(project.projectId, { newRow: currentRow + countStep, makerId: project.makerId })
        setCurrentRow(currentRow + countStep)
    }
    const handleCountStep = (e: ChangeEvent<HTMLInputElement>) => {
        setCountStep(parseInt(e.target.value))
    }

    return (
        <main id="project-layout">
            <ProjectHeader
                name={pattern.name}
                yarn={project.variant.yarn}
                size={project.variant.size}
            />
            <div id="steps">
                {project.steps ? project.steps.map(s => <StepAccordion key={s.stepId} step={s} currentRow={currentRow} />) : null}
            </div>

            {/* TODO adjust breakpoint as needed */}

            {!showNotes && (
                <button type="button" id="display-notes" className="btn btn-secondary small-only" onClick={() => setShowNotes(true)}>
                    <FontAwesomeIcon icon={faEye} />
                    Notes
                </button>
            )}


            {project.notes !== null && (viewport.w > 768 || showNotes) ? (<NotesSection projId={project.projectId} onClose={() => setShowNotes(false)} />) : null}

            <Outlet />
            <div id="back-btn" className="small-only"><ClickableIcon icon={faArrowLeft} handleClick={() => navigate(-1)} /></div>
            <StitchCounter
                count={currentRow}
                countStep={countStep}
                handleCountStep={handleCountStep}
                onClick={handleStitch}
            />
        </main>
    )
}

export default EditPatternPage
