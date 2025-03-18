import { Pattern } from "../helpers/apiResponseTypes"
import MyPatternItem from "./myPatternItem/myPatternItem"


const MyPatternsList = ({ patterns }: { patterns: Pattern[] }) => {

    return (
        <>
            <ul>
                {patterns.map(p => <MyPatternItem key={p.patternId} pattern={p} />)}
            </ul>
        </>
    )
}

export default MyPatternsList
