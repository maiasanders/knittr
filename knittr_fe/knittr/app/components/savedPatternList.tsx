import { Pattern } from "../helpers/apiResponseTypes"
import patternService from "../services/patternService"
import SavedPatternItem from "./savedPatternItem"

export async function clientLoader() {
    const patterns = patternService.getSaved().then(r => r.data)
    return { patterns }
}

const SavedPatternList = ({ patterns }: { patterns: Pattern[] }) => {

    return (
        <>
            {patterns ? (<ul>{patterns.map(p => <SavedPatternItem key={p.patternId} pattern={p} />)}</ul>) : null}
        </>
    )

}

export default SavedPatternList;
