import { Pattern } from "../helpers/apiResponseTypes"
import PublicPatternCard from "./publicPatternCard"

const PublicPatternList = ({ patterns }: { patterns: Pattern[] }) => {
    <div id="pub-pattern-list">
        {patterns.map(pattern => (<PublicPatternCard pattern={pattern} key={pattern.patternId} />))}
    </div>
}

export default PublicPatternList
