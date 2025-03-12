import { useState } from "react";
import { Project, Step } from "../helpers/apiResponseTypes";
import AddStepPopup from "../components/addStepPopup";
import { data, redirect } from "react-router-dom";
import type { Route } from "./+types/editProjectPage";
import projectService from "../services/projectService";
import useSteps from "../hooks/useSteps";


export async function clientLoader({ params }: { params: Route.LoaderArgs }) {
    const project = await projectService.getById(parseInt(params.id)).then(r => r.data)

    if (!project) throw data("Record Not Found", { status: 404 });

    return { project }
}
// const EditPatternPage = ({ loaderData }: Route.LoaderArgs<Project>) => {
const EditPatternPage = ({ loaderData }: Route.LoaderArgs<Project>) => {

    const { project } = loaderData

    if (project === undefined) throw redirect('/404')

    const { steps, postStep } = useSteps(project.variant.variantId)

    const [showAddSteps, setShowAddSteps] = useState(false)
    const [showAddToStep, setShowAddToStep] = useState(false)

    const [nextStep, setNextStep] = useState<Step>({
        stepId: 0,
        variantId: project.variant.variantId,
        title: "",
        stepNum: project.steps.length > 0 ? project.steps[project.steps.length - 1].stepNum + 1 : 1,
        rows: []
    })

    // Get the last row of each step, then find the max number to determine last row so far
    // const lastRow = Math.max(...project.steps.map(s => s.rows.length > 0 ? s.rows[s.rows.length - 1].rowNum : 0))
    let lastRow = 0;
    let allRows = project.steps.map(s => s.rows).flat()
    if (allRows.length > 0) lastRow = Math.max(...project.steps.map(s => s.rows).flat().map(r => r.rowNum))
    // let lastRow = project.steps.map(s => s.rows).flat().length > 0 ?
    //     Math.max(...project.steps.map(s => s.rows).flat(r => r.rowNum)) : 0

    return (
        <>
            <button type="button" className="btn btn-primary" onClick={() => setShowAddToStep(true)} >Add to step</button>
            <button type="button" className="btn btn-primary" onClick={() => setShowAddSteps(true)}>Create new step</button>
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
