import { ChangeEventHandler } from "react"
import { Row } from "../../helpers/apiResponseTypes"
import './addRowElement.css'

const AddRowElement = ({ row, handleChange }: { row: Row, handleChange: ChangeEventHandler }) => {

    const rowNum = typeof row.rowNum === 'number' ? row.rowNum : 1

    return (
        <div className="add-row">
            <label htmlFor={`${rowNum}`}>{rowNum}</label>
            <input
                type="text"
                id={'' + row.rowNum}
                key={row.rowNum}
                value={row.directions}
                onChange={handleChange}
                className="form-control"
            />
        </div>)
}

export default AddRowElement
