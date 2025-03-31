import { useNavigate } from "react-router-dom";
import { Size, Yarn } from "../../helpers/apiResponseTypes";
import "./projectHeader.css"
import useViewport from "../../hooks/useViewport";
import ClickableIcon from "../clickableIcon/clickableIcon";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const ProjectHeader = ({ name, yarn, size }: { name: string, yarn: Yarn, size: Size }) => {

    const viewport = useViewport();
    const navigate = useNavigate();

    return (
        <div id="project-header">
            <div className="hide-in-small"><ClickableIcon icon={faArrowLeft} handleClick={() => navigate(-1)} /></div>
            <h1>{name}</h1>
            {size.sizeId !== 1 ? (<h2 id="size-head">{size.name}{size.ageRange ? ` (${size.ageRange})` : ''}</h2>) : null}
            <h2 id="yarn-head">{yarn.name}</h2>
        </div>
    )
}

export default ProjectHeader
