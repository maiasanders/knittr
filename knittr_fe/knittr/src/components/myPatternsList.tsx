import { useEffect, useState } from "react"
import patternService from "../services/patternService"
import { Pattern } from "../helpers/apiResponseTypes"
import MyPatternItem from "./myPatternItem"


const MyPatternsList = () => {
    const [patterns, setPatterns] = useState<Pattern[]>([])

    useEffect(() => {
        patternService.getByAuthor()
            .then(res => setPatterns(res.data))
    })

    return (
        <ul>
            {patterns.map(pattern => (<MyPatternItem pattern={pattern} />))}
        </ul>
    )
}

export default MyPatternsList
