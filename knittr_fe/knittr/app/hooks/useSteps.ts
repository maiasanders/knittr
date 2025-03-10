import { useEffect, useState } from "react"
import { Step, StepDto } from "../helpers/apiResponseTypes"
import stepService from "../services/stepService"

const useSteps = (variantId: number) => {
    const [steps, setSteps] = useState<Step[]>([])

    useEffect(() => {
        const getSteps = async () => {
            await stepService.getByVariant(variantId).then(res => setSteps(res.data))
        }
        getSteps()
    }, [])

    const postStep = async (step: StepDto) => {
        const newStep = await stepService.createStep(step).then((res) => {
            setSteps([...steps, res.data])
        })
    }

    return { steps, postStep }
}

export default useSteps
