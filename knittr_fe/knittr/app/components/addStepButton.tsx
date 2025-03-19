import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { MouseEventHandler } from "react";

const AddStepButton = ({ onClick }: { onClick: MouseEventHandler }) => (<button onClick={onClick}>Steps <FontAwesomeIcon icon={faPlus} /></button>)
export default AddStepButton

// TODO should be able to delete
