import { Link } from "react-router-dom";
import { Pattern } from "../helpers/apiResponseTypes";

const PublicPatternCard = ({ pattern }: { pattern: Pattern }) => {
    return (
        <Link to={`/patterns/${pattern.patternId}`}>
            <div className="pub-pattern-card">
                <img src={pattern.defaultImage ? pattern.defaultImage.imageLink : "../vite.svg"} alt={pattern.defaultImage ? pattern.defaultImage.desc : ""} />
                <h4>{pattern.name}</h4>
                <h5>{pattern.author.username}</h5>
                <h6>{`${pattern.sizes.length || 1} Size(s)`}</h6>
            </div>
        </Link>
    )
}

export default PublicPatternCard
