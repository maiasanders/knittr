import { Pattern } from "../helpers/apiResponseTypes";
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { Link } from "react-router";
import ClickableIcon from "./clickableIcon/clickableIcon";
import usePatterns from "../hooks/usePatterns";
import { MouseEvent, useState } from "react";

const SavedPatternItem = ({ pattern }: { pattern: Pattern }) => {
    const { unsavePattern } = usePatterns()

    const [showItem, setShowItem] = useState(true)

    const handleClick = (event: MouseEvent) => {
        event.stopPropagation()
        unsavePattern(pattern)
        setShowItem(false)
    }

    return (
        <>
            {showItem ?
                (<li className="pattern-card">
                    <ClickableIcon icon={faXmark} handleClick={handleClick} />
                    <Link to={`/patterns/${pattern.patternId}`} className="card-content">
                        {pattern.defaultImage ? (<img src={pattern.defaultImage.imageLink} alt={pattern.defaultImage.desc} />) : (<img src="../placeholder.svg" alt="No image found" />)}

                        <h4>{pattern.name}</h4>
                    </Link>
                </li>) : null}
        </>
    )
}

export default SavedPatternItem;
