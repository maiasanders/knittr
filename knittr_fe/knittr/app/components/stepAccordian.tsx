import { Step } from "../helpers/apiResponseTypes";
import RowByRowItem from "./rowByRowItem";

const StepAccordian = ({ step }: { step: Step }) => {
    // TODO fix offset once I've nailed down context

    return (
        <div className="accordian-item" id={`step-${step.stepId}`}>
            <h2 className="accordian-header" id={`step${step.stepId}Head`}>
                <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target={`#step${step.stepId}Rows`} aria-expanded="true" aria-controls={`step${step.stepId}Rows`}>
                    {step.title}
                </button>
            </h2>
            <div id={`step${step.stepId}Rows`} className="accordian-collapse collapse" aria-labelledby={`step${step.stepId}Head`} data-bs-parent={`steps`}>
                <div className="accordian-body">
                    {step.rows.map(r => <p key={r.rowId}><b>{r.rowNum}</b> {r.directions}</p>)}
                    {/* <table>
                        <tbody>
                            {step.rows.map(row => (<RowByRowItem key={row.rowId} row={row} offset={0} isActive={false} />))}
                        </tbody>
                    </table> */}
                </div>
            </div>
        </div>
    )
}

export default StepAccordian
