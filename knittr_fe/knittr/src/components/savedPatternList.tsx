import { useEffect, useState } from "react";
import { Pattern, loadingStatus } from "../helpers/apiResponseTypes"
import patternService from "../services/patternService"
import SavedPatternItem from "./savedPatternItem"
import LoadingSpinner from "./loadingSpinner";


const SavedPatternList = () => {

    const [loading, setLoading] = useState<loadingStatus>(true)
    const [patterns, setPatterns] = useState<Pattern[]>([])

    useEffect(() => {
        const getPatterns = async () => {
            try {
                const retrievedPatterns = await patternService.getSaved()
                setPatterns(retrievedPatterns.data.items)
                setLoading(false)
            } catch {
                setLoading('Error')
            }
        }

        getPatterns()
    })

    if (loading === true) return <LoadingSpinner />

    return (
        <ul>
            {patterns.map(pattern => (<SavedPatternItem pattern={pattern} />))}
        </ul>
    )

}

export default SavedPatternList;
