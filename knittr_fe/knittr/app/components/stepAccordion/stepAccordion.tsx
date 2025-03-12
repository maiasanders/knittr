import { Step } from "../../helpers/apiResponseTypes";
import Accordion from 'react-bootstrap/Accordion';
import RowByRowItem from "../rowByRowItem";
import "./stepAccordion.css"

const StepAccordion = ({ step, currentRow }: { step: Step, currentRow: number }) => {
    // TODO fix offset once I've nailed down context

    return (
        <Accordion>
            <Accordion.Item eventKey={`${step.stepId}`} >
                <Accordion.Header>{step.title}</Accordion.Header>
                <Accordion.Body>
                    <table>
                        <tbody>
                            {step.rows.length > 0 ? step.rows.map(r => <RowByRowItem row={r} key={r.rowId} offset={0} isActive={currentRow === r.rowNum} />) : null}
                        </tbody>
                    </table>
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    )
}

export default StepAccordion
