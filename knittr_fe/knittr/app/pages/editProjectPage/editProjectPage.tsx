import { useState } from "react";
import { Project } from "../../helpers/apiResponseTypes";
import AddStepPopup from "../../components/addStepPopup/addStepPopup";
import { data, redirect } from "react-router-dom";
import type { Route } from "./+types/editProjectPage";
import projectService from "../../services/projectService";
import useSteps from "../../hooks/useSteps";
import './editProjectpage.module.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faPlus } from "@fortawesome/free-solid-svg-icons";


export async function clientLoader({ params }: { params: Route.LoaderArgs }) {
    const project = await projectService.getById(parseInt(params.id)).then(r => r.data)

    if (!project) throw data("Record Not Found", { status: 404 });

    return { project }
}


const EditPatternPage = ({ loaderData }: Route.LoaderArgs<Project>) => {

    const { project } = loaderData

    if (project === undefined) throw redirect('/404')

    const { steps } = useSteps(project.variant.variantId)

    const [showAddSteps, setShowAddSteps] = useState(false)
    const [showAddToStep, setShowAddToStep] = useState(false)

    const nextStep = {
        stepId: 0,
        variantId: project.variant.variantId,
        title: "",
        stepNum: project.steps.length > 0 ? project.steps[project.steps.length - 1].stepNum + 1 : 1,
        rows: []
    }

    // Get the last row of each step, then find the max number to determine last row so far
    let lastRow = 0;
    let allRows = project.steps.map(s => s.rows).flat()
    if (allRows.length > 0) lastRow = Math.max(...project.steps.map(s => s.rows).flat().map(r => r.rowNum))

    return (
        <>
            <div id="step-edit-btns">
                <button type="button" className="btn btn-primary hide-in-small" onClick={() => setShowAddToStep(true)} >Add to step</button>
                <button type="button" className="btn btn-primary small-only" onClick={() => setShowAddToStep(true)} >
                    <FontAwesomeIcon icon={faPenToSquare} />
                    Step
                </button>

                <button type="button" className="btn btn-primary hide-in-small" onClick={() => setShowAddSteps(true)}>Create new step</button>
                <button type="button" className="btn btn-primary small-only" onClick={() => setShowAddSteps(true)}>
                    <FontAwesomeIcon icon={faPlus} />
                    Step
                </button>
            </div>
            {showAddToStep ? <AddStepPopup
                currentStep={steps[steps.length - 1]}
                stepNum={steps[steps.length - 1].stepNum}
                variantId={project.variant.variantId}
                onClose={() => setShowAddToStep(false)}
                firstRowNum={lastRow + 1}
                isNew={false}
            /> : null}
            {showAddSteps ? <AddStepPopup
                currentStep={nextStep}
                stepNum={nextStep.stepNum}
                variantId={project.variant.variantId}
                onClose={() => setShowAddSteps(false)}
                firstRowNum={lastRow + 1}
                isNew={true}
            /> : null}
        </>
    )
}

export default EditPatternPage
