import { Pattern } from "../helpers/apiResponseTypes";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { Link } from "react-router";

const MyPatternItem = ({ pattern }: { pattern: Pattern }) => {
    return (
        <li>
            <img src={pattern.defaultImage ? pattern.defaultImage.imageLink : './vite.svg'} alt={pattern.defaultImage ? pattern.defaultImage.desc : ""} />
            <h3>{pattern.name}</h3>
            {/* TODO add size/yarn options */}
            <ul>
                {pattern.variants.map(v => (
                    <li key={v.variantId}>
                        <Link to={`/variants/${v.variantId}/template`}>{`${v.size.ageRange ? v.size.ageRange : ''} ${v.size.name} - ${v.yarn.name} weight`}</Link>
                    </li>
                ))}
            </ul>
            <Link to={`/patterns/new/${pattern.patternId}/variants`}>Add variant</Link>
            <FontAwesomeIcon icon={faPenToSquare} />
        </li>
    )
}

export default MyPatternItem

// TODO come up with how I'm going to handle yarns/size variants
