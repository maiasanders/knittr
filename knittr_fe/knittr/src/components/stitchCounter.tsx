import { ChangeEventHandler, MouseEventHandler } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons/faPlus";

const StitchCounter = ({ count, countStep, handleCountStep, onClick }: { count: number, countStep: number, handleCountStep: ChangeEventHandler, onClick: MouseEventHandler }) => {

    return (
        <div id="stitch-counter">
            <h3>{count}</h3>
            <input type="number" id="count-steps" value={countStep} onChange={handleCountStep} />
            <div onClick={onClick}><FontAwesomeIcon icon={faPlus} /></div>
        </div>
    )
}

export default StitchCounter
