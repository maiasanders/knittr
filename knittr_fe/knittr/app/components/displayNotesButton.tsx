import { MouseEventHandler } from "react";
import ClickableIcon from "./clickableIcon";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const DisplayNotesButton = ({ handleShow }: { handleShow: MouseEventHandler }) => (
    <button type="button" id="dispaly-notes" className="btn btn-secondary" onClick={handleShow}>
        {/* <ClickableIcon icon={faEye} handleClick={handleShow} /> */}
        <FontAwesomeIcon icon={faEye} />
        Notes
    </button>
)

export default DisplayNotesButton
