import { ChangeEventHandler, MouseEventHandler } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons/faPlus";
import "../../base.css"
import "./stitchCounter.css"

const StitchCounter = ({ count, countStep, handleCountStep, onClick }: { count: number, countStep: number, handleCountStep: ChangeEventHandler, onClick: MouseEventHandler }) => {

    return (
        <div id="stitch-counter" className="btn btn-primary">
            <h3>{count}</h3>
            <input
                type="number"
                id="count-steps"
                value={countStep}
                onChange={handleCountStep}
                className="form-control"
            />
            <div id="add-stitches" onClick={onClick}><FontAwesomeIcon icon={faPlus} /></div>
        </div>
    )
}

export default StitchCounter
