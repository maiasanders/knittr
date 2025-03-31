import { useState, useEffect } from "react"
import { Pattern } from "../helpers/apiResponseTypes"
import patternService from "../services/patternService"

const usePatterns = () => {
    const [savedPatterns, setSavedPatterns] = useState<Pattern[]>([])

    useEffect(() => {
        const getPatterns = async () => {
            await patternService.getSaved()
                .then(res => setSavedPatterns(res.data))
        }
        getPatterns()
    }, [])

    const savePattern = async (pattern: Pattern) => {
        await patternService.save(pattern.patternId)
            .then((res) => {
                if (res.status === 201) {
                    savedPatterns ? setSavedPatterns([...savedPatterns, pattern]) : setSavedPatterns([pattern])
                }
            })
    }


    const unsavePattern = async (pattern: Pattern) => {
        await patternService.unsave(pattern.patternId)
            .then((res) => {
                if (res.status === 204) {
                    setSavedPatterns(savedPatterns.filter(p => p.patternId !== pattern.patternId))
                }
            })
    }

    return { savedPatterns, savePattern, unsavePattern }
}

export default usePatterns
