import { Step } from "../helpers/apiResponseTypes";
import RowByRowItem from "./rowByRowItem";

const StepAccordian = (step: Step) => {
    // TODO fix offset once I've nailed down context

    return (
        <div className="accordian-item" id={`step-${step.stepId}`}>
            <h2 className="accordian-header" id={`step-${step.stepId}-head`}>
                <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target={`#${step.stepId}-rows`} aria-expanded="true" aria-controls={`${step.stepId}-rows`}>
                    {step.title}
                </button>
            </h2>
            <div id={`${step.stepId}-rows`} className="accordian-collapse collapse" aria-labelledby={`step-${step.stepId}-head`} data-bs-parent={`step-${step.stepId}`}>
                <div className="accordian-body">
                    <table>
                        {step.rows.map(row => (<RowByRowItem key={row.rowId} row={row} offset={0} isActive={false} />))}
                    </table>
                </div>
            </div>
        </div>
    )
}

export default StepAccordian
