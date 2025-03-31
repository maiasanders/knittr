import { Pattern } from "../helpers/apiResponseTypes"
import PublicPatternCard from "./publicPatternCard/publicPatternCard"

const PublicPatternList = ({ patterns }: { patterns: Pattern[] }) => {
    return (<div id="pub-pattern-list" className="card-list">
        {patterns.map(pattern => (<PublicPatternCard pattern={pattern} key={pattern.patternId} />))}
    </div>)
}

export default PublicPatternList
