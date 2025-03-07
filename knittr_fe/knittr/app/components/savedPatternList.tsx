import { Pattern } from "../helpers/apiResponseTypes"
import patternService from "../services/patternService"
import SavedPatternItem from "./savedPatternItem"

export async function clientLoader() {
    const patterns = patternService.getSaved().then(r => r.data)
    return { patterns }
}

const SavedPatternList = ({ patterns }: { patterns: Pattern[] }) => {

    // const { patterns } = loaderData

    // if (loading === true) return <LoadingSpinner />

    return (

        // <ul>
        //     {patterns.map(pattern => (<SavedPatternItem pattern={pattern} />))}
        // </ul>
        <>
            {patterns ? (<ul>{patterns.map(p => <SavedPatternItem pattern={p} />)}</ul>) : null}
        </>
    )

}

export default SavedPatternList;
