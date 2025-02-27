import { useEffect, useState } from "react"
import { Step, StepDto } from "../helpers/apiResponseTypes"
import stepService from "../services/stepService"

const useSteps = (patternId: number) => {
    const [steps, setSteps] = useState<Step[]>([])

    useEffect(() => {
        const getSteps = async () => {
            await stepService.getSteps(patternId).then(res => setSteps(res.data))
        }
        getSteps()
    })

    const postStep = async (step: StepDto) => {
        await stepService.createStep(step).then(res => setSteps([...steps, res.data]))
    }

    return { steps, postStep }
}

export default useSteps
