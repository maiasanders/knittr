import { Link } from "react-router"
import { Pattern } from "../helpers/apiResponseTypes"
import MyPatternItem from "./myPatternItem"


const MyPatternsList = ({ patterns }: { patterns: Pattern[] }) => {

    return (
        <>
            <ul>
                {patterns.map(p => <MyPatternItem key={p.patternId} pattern={p} />)}
                {/* TODO add link once I've added page for creating new variant */}
            </ul>
            {/* TODO add link to create new pattern */}
        </>
    )
    // return (
    //     <ul>
    //         {patterns.length > 0 ? patterns.map(pattern => (<MyPatternItem pattern={pattern} />)) : (<p>You haven't written any patterns'</p>)}
    //     </ul>
    // )
}

export default MyPatternsList
