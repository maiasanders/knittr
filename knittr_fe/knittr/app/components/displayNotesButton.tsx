import { MouseEventHandler } from "react";
import ClickableIcon from "./clickableIcon";
import { faEye } from "@fortawesome/free-solid-svg-icons";

const DisplayNotesButton = ({ handleShow }: { handleShow: MouseEventHandler }) => (
    <div>
        <ClickableIcon icon={faEye} handleClick={handleShow} />
        Notes
    </div>
)

export default DisplayNotesButton
