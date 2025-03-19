import { MouseEventHandler } from "react";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const DisplayNotesButton = ({ handleShow }: { handleShow: MouseEventHandler }) => (
    <button type="button" id="dispaly-notes" className="btn btn-secondary small-only" onClick={handleShow}>
        <FontAwesomeIcon icon={faEye} />
        Notes
    </button>
)

export default DisplayNotesButton
