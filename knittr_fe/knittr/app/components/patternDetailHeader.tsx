import { faStar as solidStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as emptyStar } from "@fortawesome/free-regular-svg-icons"
import { Pattern } from "../helpers/apiResponseTypes";
import ClickableIcon from "./clickableIcon";
import usePatterns from "../hooks/usePatterns";
import CategoryTag from "./categoryTag";

const PatternDetailHeader = ({ pattern }: { pattern: Pattern }) => {

    const { savedPatterns, savePattern, unsavePattern } = usePatterns()
    const isSaved = savedPatterns ? savedPatterns.map(p => p.patternId).includes(pattern.patternId) : false;

    return (
        <header>
            <h1>{pattern.name}</h1>
            <h2>{pattern.author.username}</h2>
            <ClickableIcon icon={isSaved ? solidStar : emptyStar} handleClick={() => isSaved ? unsavePattern(pattern) : savePattern(pattern)} />
            <div>
                {pattern.categories.map(c => (<CategoryTag name={c.category_name} key={c.categoryId} />))}
            </div>
        </header>
    )
}

export default PatternDetailHeader

// function ToggleSaved({ pattern }: Pick<, "isSaved">) {
//     const fetcher = useFetcher();

//     return (
//         <fetcher.Form method={"post"}>
//             <
//         </fetcher.Form>
//     )
// }
