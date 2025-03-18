import { useEffect, useState } from "react"
import { Row, Step, StepDto } from "../helpers/apiResponseTypes"
import stepService from "../services/stepService"
import rowService from "../services/rowService"

const useSteps = (variantId: number) => {
    const [steps, setSteps] = useState<Step[]>([])
    const [newStep, setNewStep] = useState<Step>()
    // const [newRows, setNewRows] = useState<Row[]>([])


    const postStep = async (step: StepDto, rows: Row[]) => {
        let stepId = 0;
        await stepService.createStep(step)
            .then(res => {
                if (res.status === 201) {
                    setNewStep(res.data)
                    stepId = res.data.stepId
                }
            })
            .catch(e => window.alert("Oops! Trouble saving that step"))
        if (stepId > 0) {
            for (let row of rows) {
                row.stepId = stepId
                await rowService.createRow(row)
            }
        }

    }

    useEffect(() => {
        const getSteps = async () => {
            await stepService.getByVariant(variantId).then(res => setSteps(res.data))
        }
        getSteps()
    }, [])

    return { steps, postStep, newStep }
}

export default useSteps
