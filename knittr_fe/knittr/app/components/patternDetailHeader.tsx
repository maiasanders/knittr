import { faStar } from "@fortawesome/free-solid-svg-icons";
import { Pattern } from "../helpers/apiResponseTypes";
import ClickableIcon from "./clickableIcon";
import usePatterns from "../hooks/usePatterns";
import CategoryTag from "./categoryTag";

const PatternDetailHeader = ({ pattern }: { pattern: Pattern }) => {

    const { savedPatterns, savePattern, unsavePattern } = usePatterns()
    const isSaved = savedPatterns.map(p => p.patternId).includes(pattern.patternId);

    return (
        <header>
            <h1>{pattern.name}</h1>
            <h2>{pattern.author.username}</h2>
            <ClickableIcon icon={faStar} handleClick={() => isSaved ? unsavePattern : savePattern} />
            <div>
                {pattern.categories.map(c => (<CategoryTag name={c.category_name} key={c.categoryId} />))}
            </div>
        </header>
    )
}

export default PatternDetailHeader
