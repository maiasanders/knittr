import { Pattern } from "../helpers/apiResponseTypes";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { Link } from "react-router";
import ClickableIcon from "./clickableIcon";
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
            {showItem ? <li>
                <Link to={`/patterns/${pattern.patternId}`}>
                    {pattern.defaultImage && (<img src={pattern.defaultImage.imageLink} alt={pattern.defaultImage.desc} />)}

                    <h3>{pattern.name}</h3>
                </Link>
                <ClickableIcon icon={faXmark} handleClick={handleClick} />
            </li> : null}
        </>
    )
}

export default SavedPatternItem;
