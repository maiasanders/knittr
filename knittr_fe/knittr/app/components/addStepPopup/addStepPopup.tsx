import { ChangeEvent, MouseEventHandler, useState } from "react"
import { Step, Row, StepDto } from "../../helpers/apiResponseTypes"
import useSteps from "../../hooks/useSteps"
import useRows from "../../hooks/useRows"
import AddRowElement from "../addRowElement/addRowElement"
import { faPlus } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import './addStepPopup.css'

const AddStepPopup = ({ currentStep, stepNum, variantId, onClose, firstRowNum, isNew }: {
    currentStep: Step,
    stepNum: number,
    variantId: number,
    onClose: MouseEventHandler,
    firstRowNum: number,
    isNew: boolean
}) => {

    const [title, setTitle] = useState(currentStep?.title || '')
    const [rows, setRows] = useState<Row[]>([{
        rowId: 0,
        rowNum: firstRowNum,
        stepId: currentStep.stepId || 0,
        directions: ''
    }])
    const [repeats, setRepeats] = useState(1)
    // const [stepId, setStepId] = useState(currentStep.stepId || 0)

    const { postStep } = useSteps(variantId)
    const { postRow } = useRows()

    const currentRowNum = firstRowNum + rows.length

    const handleSubmit = () => {
        if (rows.length === 1 && rows[0].directions.length === 0) return

        const rowsWithRepeats: Row[] = []

        for (let i = 0; i < repeats; i++) {
            rows.forEach((row) => {
                const rowToAdd = {
                    rowId: 0,
                    rowNum: row.rowNum + (i * rows.length),
                    stepId: currentStep.stepId || 0,
                    directions: row.directions
                }
                rowsWithRepeats.push(rowToAdd)
            })
        }

        if (isNew) {
            const dto: StepDto = {
                stepNum,
                variantId,
                title
            }
            postStep(dto, rowsWithRepeats)
        } else {
            rowsWithRepeats.forEach(row => postRow(row))
        }


    }

    const updateExistingRow = (e: ChangeEvent<HTMLInputElement>, row: Row) => {
        const updatedRow: Row = { ...row, directions: e.currentTarget.value }
        const updatedRows = [...rows]
        for (let i = 0; i < updatedRows.length; i++) {
            if (updatedRows[i].rowNum === updatedRow.rowNum) updatedRows[i] = { ...updatedRow }
        }
        setRows([...updatedRows])
    }

    const addNewRow = () => {
        const newRow: Row = {
            rowId: 0,
            rowNum: currentRowNum,
            stepId: currentStep.stepId || 0,
            directions: ''
        }

        setRows([...rows, newRow])
    }

    return (

        <form onSubmit={handleSubmit} id="add-edit-step">
            <div className="form-floating" id="title-form">
                <input
                    type="text"
                    id="step-title-edit"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    placeholder="Title"
                    className="form-control"
                    name="step-title-edit"
                />
                <label htmlFor="step-title-edit">Title</label>
            </div>
            <div id="rows">
                {rows.map(row => (<AddRowElement key={row.rowNum} row={row} handleChange={(e: ChangeEvent<HTMLInputElement>) => updateExistingRow(e, row)} />))}
            </div>
            <button
                type="button"
                className="btn btn-primary"
                onClick={addNewRow}
                id="add-row"
            >
                Row <FontAwesomeIcon icon={faPlus} />
            </button>
            <div id="repeats-input">
                <label htmlFor="repeats">Repeats</label>
                <input type="number" name="repeats" id="repeats" value={repeats} onChange={e => setRepeats(parseInt(e.target.value))} className="form-control" />
            </div>
            <div id="add-edit-step-btns">
                <button type="button" onClick={onClose} className="btn btn-warning">Cancel</button>
                <button type="submit" className="btn btn-primary">Save</button>
            </div>
        </form>

    )
}

export default AddStepPopup
