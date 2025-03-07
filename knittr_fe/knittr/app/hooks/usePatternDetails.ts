import { useEffect, useState } from "react"
import { Pattern } from "../helpers/apiResponseTypes"
import patternService from "../services/patternService"

const usePatternDetails = (id: number) => {
    const [pattern, setPattern] = useState<Pattern>()

    useEffect(() => {

        const retrievePattern = async () => {
            try {
                const retrievedPattern = await patternService.getById(id)
                    .then((res) => {
                        if (res.status === 200) {
                            setPattern(res.data)
                        } else {
                            // TODO error handling
                        }
                    })
            } catch {
                // TODO more error handling
            }
        }
        retrievePattern()
    }, [])

    return { pattern }
}

export default usePatternDetails
