import { Row, StepDto } from "../helpers/apiResponseTypes"
import stepService from "../services/stepService"
import rowService from "../services/rowService"
import useAsync from 'react-use/lib/useAsync'
import { data } from "react-router"

const useSteps = () => {


    const postStep = async (step: StepDto, rows: Row[]) => {

        stepService.createStep(step)
            .then(res => {
                if (res.status === 201) {
                    return res.data
                }
            }).then(data => {
                for (let row of rows) {
                    row.stepId = data.stepId
                    rowService.createRow(row)
                }
            })
    }

    return { postStep }
}

export default useSteps
