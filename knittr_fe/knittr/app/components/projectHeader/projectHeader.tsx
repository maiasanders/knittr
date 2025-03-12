import { Link, useNavigate } from "react-router-dom";
import { Size, Yarn } from "../../helpers/apiResponseTypes";
import "./projectHeader.css"

const ProjectHeader = ({ name, yarn, size }: { name: string, yarn: Yarn, size: Size }) => {

    return (
        <div id="project-header">

            <h1>{name}</h1>
            {size.sizeId !== 1 ? (<h2 id="size-head">{size.name}{size.ageRange ? ` (${size.ageRange})` : ''}</h2>) : null}
            <h2 id="yarn-head">{yarn.name}</h2>
        </div>
    )
}

export default ProjectHeader
