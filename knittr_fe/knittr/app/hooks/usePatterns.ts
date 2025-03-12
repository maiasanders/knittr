import { useState, useEffect } from "react"
import { loadingStatus, Pattern } from "../helpers/apiResponseTypes"
import patternService from "../services/patternService"

const usePatterns = () => {
    const [savedPatterns, setSavedPatterns] = useState<Pattern[]>([])
    const [loading, setLoading] = useState<loadingStatus>(true)

    useEffect(() => {
        const getPatterns = async () => {
            try {
                const retrievedPatterns = await patternService.getSaved()
                setSavedPatterns(retrievedPatterns.data)
                setLoading(false)
            } catch {
                setLoading('Error')
            }
        }
        getPatterns()
    }, [])

    const savePattern = async (pattern: Pattern) => {
        setLoading(true)
        await patternService.save(pattern.patternId)
            .then((res) => {
                if (res.status === 201) {
                    savedPatterns ? setSavedPatterns([...savedPatterns, pattern]) : setSavedPatterns([pattern])
                    setLoading(false)
                } else {
                    setLoading('Error')
                }
            })
    }


    const unsavePattern = async (pattern: Pattern) => {
        setLoading(true)
        await patternService.unsave(pattern.patternId)
            .then((res) => {
                if (res.status === 204) {
                    setSavedPatterns(savedPatterns.filter(p => p.patternId !== pattern.patternId))
                    setLoading(false)
                } else {
                    // TODO add error response
                }
            })
    }

    const getPattern = (id: number) => {
        setLoading(true)
        patternService.getById(id)
    }

    return { savedPatterns, loading, savePattern, unsavePattern }
}

export default usePatterns
