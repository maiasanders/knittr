import { Step } from "../helpers/apiResponseTypes";
import RowByRowItem from "./rowByRowItem";

const StepAccordian = ({ step }: { step: Step }) => {
    // TODO fix offset once I've nailed down context

    return (
        <div className="accordion" id={`step-${step.stepId}-accor`}>
            <div className="accordion-item">
                <h2 className="accordion-header" id={`step-${step.stepId}-head`}>
                    <button
                        className="accordion-button"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target={`#step-${step.stepId}`}
                        // aria-expanded="true"
                        aria-controls={`step-${step.stepId}`}
                    >
                        {step.title}
                    </button>
                </h2>
                <div
                    id={`step-${step.stepId}`}
                    className="accordion-collapse collapse" aria-labelledby={`step-${step.stepId}-head`} data-bs-parent={`#step-${step.stepId}-accor`}
                >
                    <div className="accordion-body">
                        <strong>This is the first item's accordion body.</strong> It is shown by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
                    </div>
                </div>
            </div>
        </div>

    )
}

export default StepAccordian
