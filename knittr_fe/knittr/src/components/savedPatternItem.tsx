import { Pattern } from "../helpers/apiResponseTypes";


const SavedPatternItem = (pattern: Pattern) => {
    <li>
        <img src={pattern.defaultImage.imageLink} alt={pattern.defaultImage.desc} />
        <h3>{pattern.name}</h3>
        {/* {if ()} */}
    </li>
}

export default SavedPatternItem;
