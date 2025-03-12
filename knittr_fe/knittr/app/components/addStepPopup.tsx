import { ChangeEvent, ChangeEventHandler, FormEvent, FormEventHandler, MouseEventHandler, useState } from "react"
import { Step, Row, StepDto } from "../helpers/apiResponseTypes"
import useSteps from "../hooks/useSteps"
import useRows from "../hooks/useRows"
import AddRowElement from "./addRowElement"
import ClickableIcon from "./clickableIcon"
import { faPlus } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

// TODO make me work next!!!!

const AddStepPopup = ({ currentStep, stepNum, variantId, onClose, firstRowNum, isNew }: {
    currentStep: Step,
    stepNum: number,
    variantId: number,
    onClose: MouseEventHandler,
    firstRowNum: number,
    isNew: boolean
}) => {
    // TODO prompt add to current step or create new
    //  TODO how do I maintain editting and state for text of multiple rows simultaneously

    const [title, setTitle] = useState(currentStep?.title || '')
    const [rows, setRows] = useState<Row[]>([])
    const [nextRow, setNextRow] = useState<Row>({
        rowId: 0,
        rowNum: firstRowNum,
        stepId: currentStep.stepId || 0,
        directions: ''
    })
    const [repeats, setRepeats] = useState(1)

    const { steps, postStep } = useSteps(variantId)
    const { postRow } = useRows()

    const currentRowNum = firstRowNum + rows.length + 1

    const handleSubmit = (e: FormEvent) => {
        if (rows.length === 0 && !nextRow.directions) return
        let stepId: number = currentStep.stepId || 0;

        if (isNew) {
            postStep({
                stepNum,
                variantId,
                title
            })
            stepId = steps[steps.length - 1].stepId
        }

        if (nextRow.directions) setRows([...rows, nextRow])

        for (let i = 0; i < repeats; i++) {
            rows.forEach((row) => {
                postRow({
                    rowId: 0,
                    rowNum: row.rowNum + (i * rows.length),
                    stepId: stepId,
                    directions: row.directions
                })
            })
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
        setRows([...rows, nextRow])

        setNextRow({
            rowId: 0,
            rowNum: currentRowNum,
            stepId: currentStep?.stepId || 0,
            directions: ''
        })
    }


    const updateNextRow = (e: ChangeEvent<HTMLInputElement>) => {
        const updatedRow: Row = {
            ...nextRow,
            directions: e.currentTarget.value
        }
        setNextRow(updatedRow)
    }


    return (
        <div id="add-edit-step">
            <form onSubmit={handleSubmit}>
                <div className="form-floating">
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
                {rows.map(row => (<AddRowElement key={row.rowNum} row={row} handleChange={(e: ChangeEvent<HTMLInputElement>) => updateExistingRow(e, row)} />))}
                <AddRowElement
                    key={currentRowNum}
                    row={nextRow}
                    handleChange={updateNextRow}
                />
                <button
                    type="button"
                    className="btn btn-primary"
                    onClick={addNewRow}
                >
                    Row <FontAwesomeIcon icon={faPlus} />
                </button>
                <div>
                    <label htmlFor="repeats">Repeats</label>
                    <input type="number" name="repeats" id="repeats" value={repeats} onChange={e => setRepeats(parseInt(e.target.value))} className="form-control" />
                </div>
                <div>
                    <button type="button" onClick={onClose} className="btn btn-warning">Cancel</button>
                    <button type="submit" className="btn btn-primary">Save</button>
                </div>
            </form>
        </div>
    )
}

export default AddStepPopup
