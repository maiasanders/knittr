import { ChangeEvent, useState } from "react";
import { Project } from "../helpers/apiResponseTypes";
import ProjectHeader from "../components/projectHeader/projectHeader";
import NotesSection from "../components/notesSection/notesSection";
import useViewport from "../hooks/useViewport";
import DisplayNotesButton from "../components/displayNotesButton";
import StitchCounter from "../components/stitchCounter/stitchCounter";
import { Outlet, redirect, useNavigate } from "react-router-dom";
import type { Route } from "./+types/editProjectPage";
import projectService from "../services/projectService";
import "./projectLayout.css"
import ClickableIcon from "../components/clickableIcon";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import StepAccordion from "../components/stepAccordion/stepAccordion";

// TODO add logic to determine rows based on repeats

export async function clientLoader({ params }: { params: Route.LoaderArgs }) {

    const project = await projectService.getById(params.id).then(r => r.data)
    return { project }

    // TODO error handling
}

const EditPatternPage = ({ loaderData }: Route.LoaderArgs<Project>) => {

    const viewport = useViewport()
    const { project } = loaderData
    const navigate = useNavigate();

    const pattern = project.pattern
    if (project === undefined) throw redirect('/404')

    const [currentRow, setCurrentRow] = useState(project.currentRow)
    const [countStep, setCountStep] = useState(1)

    const [showNotes, setShowNotes] = useState(false)

    const handleStitch = () => {
        setCurrentRow(currentRow + countStep)
        projectService.updateProgess(project.projectId, { newRow: currentRow, makerId: project.makerId })
    }
    const handleCountStep = (e: ChangeEvent<HTMLInputElement>) => {
        setCountStep(parseInt(e.target.value))
    }

    return (
        <main>
            <ProjectHeader
                name={pattern.name}
                yarn={project.variant.yarn}
                size={project.variant.size}
            />
            <div id="steps">
                {project.steps ? project.steps.map(s => <StepAccordion key={s.stepId} step={s} currentRow={currentRow} />) : null}
            </div>

            {/* TODO adjust breakpoint as needed */}
            {viewport.w <= 768 ? <DisplayNotesButton handleShow={() => setShowNotes(showNotes ? false : true)} /> : null}

            {project.notes !== null && (viewport.w > 768 || showNotes) ? (<NotesSection projId={project.projectId} />) : null}

            <Outlet />
            <ClickableIcon icon={faArrowLeft} handleClick={() => navigate(-1)} />
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
