import apiAccess from "../services/axiosConfig"
import { Row } from "../helpers/apiResponseTypes"
import { useState } from "react"

const useRows = () => {

    const [row, setRow] = useState<Row>()

    const postRow = async (newRow: Row) => {
        apiAccess.post("/rows", newRow).then((res) => {
            setRow(res.data)
            return row
        })
    }

    return { postRow }

}

export default useRows
