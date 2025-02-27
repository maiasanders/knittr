import { ChangeEvent, useContext, useState } from "react";
import { Project } from "../helpers/apiResponseTypes";
import { AuthContext } from "../context/authContext";
import ProjectHeader from "../components/projectHeader";
import StepAccordian from "../components/stepAccordian";
import NotesSection from "../components/notesSection";
import useViewport from "../hooks/useViewport";
import DisplayNotesButton from "../components/displayNotesButton";
import AddStepButton from "../components/addStepButton";
import StitchCounter from "../components/stitchCounter";
import AddStepPopup from "../components/addStepPopup";

// TODO add logic to determine rows based on repeats

const ProjectPage = (project: Project) => {
    const authContext = useContext(AuthContext)
    const isAuthor = project.pattern.author.userId === authContext.userId

    const viewport = useViewport()

    const [showNotes, setShowNotes] = useState(false)
    const [showAddSteps, setShowAddSteps] = useState(false)
    const [currentRow, setCurrentRow] = useState(project.currentRow)
    const [countStep, setCountStep] = useState(1)

    const currentStep = project.steps.filter((step) => {
        for (const row of step.rows) {
            if (row.rowNum === currentRow) return step
        }
    })[0]

    const handleStitch = () => {
        setCurrentRow(currentRow + countStep)
    }
    const handleCountStep = (e: ChangeEvent<HTMLInputElement>) => {
        setCountStep(parseInt(e.target.value))
    }

    return (
        <>
            <ProjectHeader
                name={project.pattern.name}
                yarn={project.yarn}
                size={project.size}
            />
            <div id="steps">
                {project.steps.map(step => (<StepAccordian step={step} />))}
            </div>
            {/* TODO adjust breakpoint as needed */}
            {viewport.w > 768 || showNotes ? (<NotesSection projId={project.projectId} />) : (<DisplayNotesButton handleShow={() => setShowNotes(true)} />)}
            {isAuthor ? (<AddStepButton onClick={() => setShowAddSteps(true)} />) : null}
            {isAuthor && showAddSteps ? <AddStepPopup
                currentStep={currentStep}
                stepNum={currentStep.stepNum || currentStep.stepNum + 1}
                patternId={project.pattern.patternId}
                yarnId={project.yarn.yarnId}
                sizeId={project.size.sizeId}
                onClose={() => setShowAddSteps(false)}
            /> : null}
            <StitchCounter
                count={currentRow}
                countStep={countStep}
                handleCountStep={handleCountStep}
                onClick={handleStitch}
            />
        </>
    )
}

export default ProjectPage
