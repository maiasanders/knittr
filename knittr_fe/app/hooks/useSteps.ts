import { Row, StepDto } from "../helpers/apiResponseTypes"
import stepService from "../services/stepService"
import rowService from "../services/rowService"
import useAsync from 'react-use/lib/useAsync'
import { data } from "react-router"

const useSteps = () => {


    const postStep = (step: StepDto) => {

        const result = stepService.createStep(step)
            .then(res => {
                if (res.status === 201) {
                    return res.data
                }
            })
    }

    return { postStep }
}

export default useSteps
