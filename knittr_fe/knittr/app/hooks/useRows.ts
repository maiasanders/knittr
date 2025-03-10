import { Row } from "../helpers/apiResponseTypes"
import { useState } from "react"
import rowService from "../services/rowService"

const useRows = () => {

    const [row, setRow] = useState<Row>()

    const postRow = async (newRow: Row) => {
        await rowService.createRow(newRow).then((res) => {
            setRow(res.data)
        })
    }

    return { postRow }

}

export default useRows
