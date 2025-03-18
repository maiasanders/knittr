import { Pattern } from "../../helpers/apiResponseTypes";
import { Link } from "react-router";
import './myPatternItem.css'

const MyPatternItem = ({ pattern }: { pattern: Pattern }) => {

    return (
        <li className="my-ptrn">
            <img src={pattern.defaultImage ? pattern.defaultImage.imageLink : '../placeholder.svg'} alt={pattern.defaultImage ? pattern.defaultImage.desc : ""} />
            <div className="ptrn-container">
                <h3>{pattern.name}</h3>
                <ul className="pattern-vars">
                    {pattern.variants.map(v => (
                        <li key={v.variantId}>
                            <Link to={`/variants/${v.variantId}/template`}>{`${v.size.ageRange !== 'n/a' ? v.size.ageRange : ''} ${v.size.name} - ${v.yarn.name} weight`}</Link>
                        </li>
                    ))}
                </ul>
                <Link to={`/patterns/new/${pattern.patternId}/variants`} className="add-var">+ Add variant</Link>
            </div>
        </li>
    )
}

export default MyPatternItem
