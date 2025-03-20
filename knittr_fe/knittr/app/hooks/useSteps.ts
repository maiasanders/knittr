import { useEffect, useState } from "react"
import { Row, Step, StepDto } from "../helpers/apiResponseTypes"
import stepService from "../services/stepService"
import rowService from "../services/rowService"

const useSteps = (variantId: number, rows?: Row[]) => {
    // const [newStep, setNewStep] = useState<Step>()
    const [stepId, setStepId] = useState(0)


    const postStep = async (step: StepDto, rows: Row[]) => {
        // const newStepId = await stepService.createStep(step).then(r => r.data.stepId)
        // processSteps(rows, newStepId)

        // let stepId = 0;
        const newStep = await stepService.createStep(step)
            .then(res => {
                if (res.status === 201) {
                    // setNewStep(res.data)
                    // stepId = res.data.stepId
                    setStepId(res.data.stepId)
                    return res.data
                }
            })
        // .then(r => {
        //     if (stepId > 0) {
        //         for (let row of rows) {
        //             row.stepId = stepId
        //             rowService.createRow(row)
        //         }
        //     }
        // })
        // .catch(e => window.alert("Oops! Trouble saving that step"))
        // console.log(stepId)
        if (newStep.stepId) {
            for (let row of rows) {
                row.stepId = newStep.stepId
                await rowService.createRow(row)
            }
        }

    }

    async function processSteps(rows: Row[], stepId: number) {
        for (let row of rows) {
            row.stepId = stepId
            await rowService.createRow(row)
        }
    }
    if (rows) processSteps(rows, stepId)


    useEffect(() => {


    }, [stepId])

    return { postStep, /*newStep*/ }
}

export default useSteps
