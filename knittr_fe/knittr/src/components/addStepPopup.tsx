import { ChangeEvent, MouseEventHandler, useState } from "react"
import { Step, Row, StepDto } from "../helpers/apiResponseTypes"
import stepService from "../services/stepService"
import useSteps from "../hooks/stepHooks"
import useRows from "../hooks/useRows"

const AddStepPopup = ({ currentStep, stepNum, patternId, yarnId, sizeId, onClose }: {
    currentStep?: Step,
    stepNum: number,
    patternId: number,
    yarnId: number,
    sizeId: number,
    onClose: MouseEventHandler
}) => {
    // TODO prompt add to current step or create new
    //  TODO how do I maintain editting and state for text of multiple rows simultaneously

    const [title, setTitle] = useState(currentStep?.title || '')
    const [rows, setRows] = useState<Row[]>(currentStep?.rows || [])
    const [nextRow, setNextRow] = useState('')
    const [repeats, setRepeats] = useState(1)

    const { postStep } = useSteps(patternId)
    const { postRow } = useRows()

    const minRow = Math.min(...rows.map(r => r.rowNum)) || 0
    const maxRow = Math.max(...rows.map(r => r.rowNum)) || 0

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const newRows = rows.map((row) => {
            if (parseInt(e.target.id) === row.rowNum) {
                row.directions = e.target.value
                return row
            }
            return row
        })
        setRows([...newRows])
    }

    const addNewRow = () => {
        const newRow: Row = {
            rowId: 0,
            rowNum: maxRow + 1,
            stepId: currentStep?.stepId || 0,
            directions: nextRow
        }
        setRows([...rows, newRow])
        setNextRow('')
    }

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault()
        if (!currentStep) {
            const newStep: StepDto = {
                patternId,
                yarnId,
                sizeId,
                title,
                stepNum
            }
            postStep(newStep)
        }
        rows.forEach(r => postRow(r))
        // figure out logic to close dialog
    }


    return (
        <div id="add-edit-step">
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    id="step-title-edit"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Step Title"
                />
                {rows.map(row => (
                    <div>
                        <label htmlFor={`${row.rowId}`}>{row.rowNum}</label>
                        <input
                            type="text"
                            id={'' + row.rowNum}
                            key={row.rowNum}
                            value={row.directions}
                            onChange={handleChange}
                        />
                    </div>
                ))}
                <div>
                    <label htmlFor={'' + (maxRow + 1)}>{maxRow + 1}</label>
                    <input
                        type="text"
                        id={'' + (maxRow + 1)}
                        value={nextRow}
                        onChange={e => setNextRow(e.target.value)}
                        onBlur={addNewRow}
                    />
                </div>
                <div>
                    <label htmlFor="repeats">Repeats</label>
                    <input type="number" name="repeats" id="repeats" value={repeats} onChange={e => setRepeats(parseInt(e.target.value))} />
                </div>
                <div>
                    <button type="button" onClick={onClose}>Cancel</button>
                    <button type="submit">Save</button>
                </div>
            </form>
        </div>
    )
}

export default AddStepPopup
