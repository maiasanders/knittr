import { ChangeEvent, ChangeEventHandler, FormEvent, FormEventHandler, MouseEventHandler, useState } from "react"
import { Step, Row, StepDto } from "../helpers/apiResponseTypes"
import useSteps from "../hooks/useSteps"
import useRows from "../hooks/useRows"
import AddRowElement from "./addRowElement"

// TODO make me work next!!!!

const AddStepPopup = ({ currentStep, stepNum, variantId, onClose, handleChange, firstRowNum }: {
    currentStep?: Step,
    stepNum: number,
    variantId: number,
    onClose: MouseEventHandler,
    // handleSubmit: FormEventHandler,
    handleChange: ChangeEventHandler,
    firstRowNum: number
}) => {
    // TODO prompt add to current step or create new
    //  TODO how do I maintain editting and state for text of multiple rows simultaneously

    const [title, setTitle] = useState(currentStep?.title || '')
    const [rows, setRows] = useState<Row[]>([])
    const [nextRow, setNextRow] = useState('')
    const [repeats, setRepeats] = useState(1)

    const { postStep } = useSteps(variantId)
    const { postRow } = useRows()

    const minRow = Math.min(...rows.map(r => r.rowNum)) || firstRowNum
    const maxRow = Math.max(...rows.map(r => r.rowNum)) || firstRowNum
    let currentRowNum = firstRowNum;

    // const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    //     const newRows = rows.map((row) => {
    //         if (parseInt(e.target.id) === row.rowNum) {
    //             row.directions = e.target.value
    //             return row
    //         }
    //         return row
    //     })
    //     setRows([...newRows])
    // }
    const handleSubmit = (e: FormEvent) => {
        postStep({
            stepNum,
            variantId,
            title
        })
        let currentRowNum = firstRowNum
        for (let i = 0; i < repeats; i++) {
            rows.forEach(r => {
                r.rowNum = currentRowNum
                postRow(r)
            })
            currentRowNum++
        }
    }

    const addNewRow = () => {
        const newRow: Row = {
            rowId: 0,
            rowNum: currentRowNum + 1,
            stepId: currentStep?.stepId || 0,
            directions: nextRow
        }
        setRows([...rows, newRow])
        currentRowNum++
        setNextRow('')
    }

    // const handleSubmit = (event: React.FormEvent) => {
    //     event.preventDefault()
    //     if (!currentStep) {
    //         const newStep: StepDto = {
    //             patternId,
    //             yarnId,
    //             sizeId,
    //             title,
    //             stepNum
    //         }
    //         postStep(newStep)
    //     }
    //     rows.forEach(r => postRow(r))
    //     //  TODOfigure out logic to close dialog
    // }


    return (
        <div id="add-edit-step">
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    id="step-title-edit"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    placeholder="Step Title"
                />
                {rows.map(row => (<AddRowElement key={row.rowNum} row={row} handleChange={handleChange} />))}
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
