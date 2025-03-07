import { Pattern } from "../helpers/apiResponseTypes";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'

const SavedPatternItem = ({ pattern }: { pattern: Pattern }) => {
    return (
        <li>
            <img src={pattern.defaultImage.imageLink} alt={pattern.defaultImage.desc} />
            <h3>{pattern.name}</h3>
            {/* {if ()} */}
            <FontAwesomeIcon icon={faXmark} />
        </li>
    )
}

export default SavedPatternItem;
