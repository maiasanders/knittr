import { MouseEventHandler, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons/faPlus";

const StitchCounter = ({ count, onClick }: { count: number, onClick: MouseEventHandler }) => {
    const [countStep, setCountStep] = useState(1)

    return (
        <div id="stitch-counter">
            <h3>{count}</h3>
            <input type="number" id="count-steps" value={countStep} onChange={e => setCountStep(parseInt(e.target.value))} />
            <div onClick={onClick}><FontAwesomeIcon icon={faPlus} /></div>
        </div>
    )
}

export default StitchCounter
