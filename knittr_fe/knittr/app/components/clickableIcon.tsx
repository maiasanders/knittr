import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { MouseEventHandler } from "react";

const ClickableIcon = ({ icon, handleClick }: { icon: IconDefinition, handleClick: MouseEventHandler }) => (
    <div className="icon-btn" onClick={handleClick}><FontAwesomeIcon icon={icon} /></div>
)

export default ClickableIcon
