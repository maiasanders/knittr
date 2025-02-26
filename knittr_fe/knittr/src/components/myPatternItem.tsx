import { Pattern } from "../helpers/apiResponseTypes";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'

const MyPatternItem = ({ pattern }: { pattern: Pattern }) => {
    return (
        <li>
            <img src={pattern.defaultImage.imageLink} alt={pattern.defaultImage.desc} />
            <h3>{pattern.name}</h3>
            <FontAwesomeIcon icon={faPenToSquare} />
        </li>
    )
}

export default MyPatternItem

// TODO come up with how I'm going to handle yarns/size variants
