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

    const [currentRow, setCurrentRow] = useState(project.currentRow)
    const [countStep, setCountStep] = useState(1)
    const { steps, postStep } = useSteps(project.variant.variantId)

    const [showNotes, setShowNotes] = useState(false)
    const [showAddSteps, setShowAddSteps] = useState(false)
    const [showAddToStep, setShowAddToStep] = useState(false)

    const [nextStep, setNextStep] = useState<Step>({
        stepId: 0,
        variantId: project.variant.variantId,
        title: "",
        stepNum: project.steps.length > 0 ? project.steps[project.steps.length - 1].stepNum + 1 : 1,
        rows: []
    })
    const [nextStepTitle, setNextStepTitle] = useState("")

    // Get the last row of each step, then find the max number to determine last row so far
    const lastRow = Math.max(...project.steps.map(s => s.rows.length > 0 ? s.rows[s.rows.length - 1].rowNum : 0))

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

            <div className="accordion" id="accordionExample">
                <div className="accordion-item">
                    <h2 className="accordion-header" id="headingOne">
                        <button
                            className="accordion-button"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#collapseOne"
                            aria-expanded="true"
                            aria-controls="collapseOne"
                        >
                            Accordion Item #1
                        </button>
                    </h2>
                    <div
                        id="collapseOne"
                        className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample"
                    >
                        <div className="accordion-body">
                            <strong>This is the first item's accordion body.</strong> It is shown by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
                        </div>
                    </div>
                </div>
                <div className="accordion-item">
                    <h2 className="accordion-header" id="headingTwo">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                            Accordion Item #2
                        </button>
                    </h2>
                    <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                        <div className="accordion-body">
                            <strong>This is the second item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
                        </div>
                    </div>
                </div>
                <div className="accordion-item">
                    <h2 className="accordion-header" id="headingThree">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                            Accordion Item #3
                        </button>
                    </h2>
                    <div id="collapseThree" className="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                        <div className="accordion-body">
                            <strong>This is the third item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
                        </div>
                    </div>
                </div>
            </div>

            {project.steps ? project.steps.map(s => <StepAccordian key={s.stepId} step={s} />) : null}

            <div id="step-accordian" className="accordian">
                {/* {steps ? steps.map(step => (<StepAccordian key={step.stepId} step={step} />)) : null} */}
                {project.steps ? project.steps.map(step => (<StepAccordian key={step.stepId} step={step} />)) : null}
            </div>
            {/* TODO adjust breakpoint as needed */}
            {project.notes !== null && (viewport.w > 768 || showNotes) ? (<NotesSection projId={project.projectId} />) : (<DisplayNotesButton handleShow={() => setShowNotes(true)} />)}

            <button type="button" className="btn btn-primary" onClick={() => setShowAddToStep(true)} >Add to step</button>
            <button type="button" className="btn btn-primary" onClick={() => setShowAddSteps(true)}>Create new step</button>
            {showAddToStep ? <AddStepPopup
                currentStep={steps[steps.length - 1]}
                stepNum={steps[steps.length - 1].stepNum}
                variantId={project.variant.variantId}
                onClose={() => setShowAddToStep(false)}
                firstRowNum={Math.max(...steps[steps.length - 1].rows.map(r => r.rowNum))}
            /> : null}
            {showAddSteps ? <AddStepPopup
                currentStep={nextStep}
                stepNum={nextStep.stepNum}
                variantId={project.variant.variantId}
                onClose={() => setShowAddSteps(false)}
                firstRowNum={lastRow + 1}
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
