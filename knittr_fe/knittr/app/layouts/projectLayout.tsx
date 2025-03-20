import { ChangeEvent, lazy, Suspense, useState } from "react";
import { Project, Step } from "../helpers/apiResponseTypes";
import ProjectHeader from "../components/projectHeader/projectHeader";
import NotesSection from "../components/notesSection/notesSection";
import useViewport from "../hooks/useViewport";
import StitchCounter from "../components/stitchCounter/stitchCounter";
import { Link, Outlet, redirect, useNavigate } from "react-router-dom";
import type { Route } from "./+types/projectLayout";
import projectService from "../services/projectService";
import "./projectLayout.css"
import ClickableIcon from "../components/clickableIcon";
import { faArrowLeft, faEye } from "@fortawesome/free-solid-svg-icons";
// import StepAccordion from "../components/stepAccordion/stepAccordion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Modal from 'react-bootstrap/Modal'
import LoadingSpinner from "../components/loadingSpinner/loadingSpinner";

const StepAccordion = lazy(() => import('../components/stepAccordion/stepAccordion'))

export async function clientLoader({ params }: { params: Route.LoaderArgs }) {

    const project = await projectService.getById(params.id).then(r => r.data)
    return { project }

}

// TODO add ability to "complete" project

const ProjectLayout = ({ loaderData }: Route.LoaderArgs<Project>) => {

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

    //** Logic for checking if user has reached final stitch */
    const [showModal, setShowModal] = useState(false)

    // Transforms and flattens steps to get the last rown number
    const finalRow = Math.max(...project.steps
        .map((s: Step) => s.rows.map(r => r.rowNum))
        .flat()
    )
    // checks if current row is same as final row
    const isOnFinalRow = project.currentRow >= finalRow

    const handleClick = () => {
        projectService.markCompleted(project.projectId)
        setShowModal(true)
    }

    return (
        <main id="project-layout">
            <ProjectHeader
                name={pattern.name}
                yarn={project.variant.yarn}
                size={project.variant.size}
            />
            <Suspense fallback={<LoadingSpinner />}>
                <div id="steps">
                    {project.steps ? project.steps.map((s: Step) => <StepAccordion key={s.stepId} step={s} currentRow={currentRow} />) : null}
                </div>
            </Suspense>

            {!showNotes && (
                <button type="button" id="display-notes" className="btn btn-secondary small-only" onClick={() => setShowNotes(true)}>
                    <FontAwesomeIcon icon={faEye} />
                    Notes
                </button>
            )}


            {project.notes !== null && (viewport.w > 768 || showNotes) ? (<NotesSection projId={project.projectId} onClose={() => setShowNotes(false)} />) : null}

            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Congrats!</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/* Insert logic to add pics or some thing here */}
                    <Link to={'/projects'} className="btn btn-primary">Back to my projects</Link>
                </Modal.Body>
            </Modal>
            {isOnFinalRow ? (
                <button
                    type="button"
                    className="btn btn-success"
                    id="complete-btn"
                    onClick={handleClick}
                >Project completed!</button>
            ) : null}

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

export default ProjectLayout
