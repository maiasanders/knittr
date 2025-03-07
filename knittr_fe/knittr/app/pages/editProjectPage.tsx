import { ChangeEvent, useState } from "react";
import { Project, Step } from "../helpers/apiResponseTypes";
import ProjectHeader from "../components/projectHeader";
import StepAccordian from "../components/stepAccordian";
import NotesSection from "../components/notesSection";
import useViewport from "../hooks/useViewport";
import DisplayNotesButton from "../components/displayNotesButton";
import AddStepButton from "../components/addStepButton";
import StitchCounter from "../components/stitchCounter";
import AddStepPopup from "../components/addStepPopup";
import { redirect } from "react-router-dom";
import type { Route } from "./+types/editProjectPage";
import projectService from "../services/projectService";
import useSteps from "../hooks/useSteps";

// TODO add logic to determine rows based on repeats

export async function clientLoader({ params }: { params: Route.LoaderArgs }) {
    const project = await projectService.getTemplateProject(params.id).then(r => r.data)
    return { project }
    // TODO error handling
}

const EditPatternPage = ({ loaderData }: Route.LoaderArgs<Project>) => {

    const viewport = useViewport()
    const { project } = loaderData
    console.log(project)
    const pattern = project.pattern
    if (project === undefined) throw redirect('/404')

    const [showNotes, setShowNotes] = useState(false)
    const [showAddSteps, setShowAddSteps] = useState(false)
    const [currentRow, setCurrentRow] = useState(project.currentRow)
    const [countStep, setCountStep] = useState(1)
    const { steps, postStep } = useSteps(project.variant.variantId)
    // const [steps, setSteps] = useState<Step[]>(project.steps !== null ? project.steps : [])
    const [nextStep, setNextStep] = useState<Step>({
        stepId: 0,
        variantId: project.variant.variantId,
        title: "",
        stepNum: steps.length > 0 ? steps[steps.length - 1].stepNum : 1,
        rows: []
    })
    const [nextStepTitle, setNextStepTitle] = useState("")

    // Get the last row of each step, then find the max number to determine last row so far
    const lastRow = Math.max(...steps.map(s => s.rows[s.rows.length - 1].rowNum))

    // const currentStep: Step = steps ? steps.filter((step: Step) => {
    //     for (const row of step.rows) {
    //         if (row.rowNum === currentRow) return step
    //     }
    // })[0] : {
    //     stepId: 0,
    //     variant: project.variant,
    //     title: "",
    //     stepNum: 1,
    //     rows: []
    // }

    const handleStitch = () => {
        setCurrentRow(currentRow + countStep)
    }
    const handleCountStep = (e: ChangeEvent<HTMLInputElement>) => {
        setCountStep(parseInt(e.target.value))
    }

    const submitNewStep = () => {
        postStep({
            variantId: nextStep.variantId,
            title: nextStep.title,
            stepNum: nextStep.stepNum
        })
        setNextStep({
            stepId: 0,
            variantId: project.variant.variantId,
            title: "",
            stepNum: steps.length + 1,
            rows: []
        })
        setShowAddSteps(false)
    }

    return (
        <>
            <ProjectHeader
                name={pattern.name}
                yarn={project.variant.yarn}
                size={project.variant.size}
            />
            <div id="steps" className="accordian">
                {steps ? steps.map(step => (<StepAccordian key={step.stepId} step={step} />)) : null}
            </div>
            {/* TODO adjust breakpoint as needed */}
            {project.notes !== null && (viewport.w > 768 || showNotes) ? (<NotesSection projId={project.projectId} />) : (<DisplayNotesButton handleShow={() => setShowNotes(true)} />)}

            <button type="button" className="btn btn-primary">Add to step</button>
            <button type="button" className="btn btn-primary" onClick={() => setShowAddSteps(true)}>Create new step</button>
            <AddStepButton onClick={() => setShowAddSteps(true)} />
            {showAddSteps ? <AddStepPopup
                currentStep={nextStep}
                // title={nextStepTitle}
                stepNum={nextStep.stepNum}
                variantId={project.variant.variantId}
                onClose={() => setShowAddSteps(false)}
                handleChange={(e: ChangeEvent<HTMLInputElement>) => setNextStepTitle(e.currentTarget.value)}
                firstRowNum={lastRow + 1}
            // handleSubmit={() => {
            //     postStep({
            //         variantId: nextStep.variantId,
            //         title: nextStep.title,
            //         stepNum: nextStep.stepNum
            //     })
            //     setNextStep({
            //         stepId: 0,
            //         variantId: project.variant.variantId,
            //         title: "",
            //         stepNum: steps.length + 1,
            //         rows: []
            //     })
            //     setShowAddSteps(false)
            // }}
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

export default EditPatternPage
