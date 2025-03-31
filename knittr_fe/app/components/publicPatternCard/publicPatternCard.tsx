import { Link } from "react-router-dom";
import { Pattern } from "../../helpers/apiResponseTypes";
import './publicPatternCard.css'

const PublicPatternCard = ({ pattern }: { pattern: Pattern }) => {
    return (
        <Link to={`/patterns/${pattern.patternId}`} className="pattern-card">
            <div className="card-content">
                <img src={pattern.defaultImage ? pattern.defaultImage.imageLink : "../placeholder.svg"} alt={pattern.defaultImage ? pattern.defaultImage.desc : ""} />
                <div className="pat-info">
                    <h4>{pattern.name}</h4>
                    <h5>{pattern.author.username}</h5>
                    <h6>{`${pattern.variants.length || 1} Options`}</h6>
                </div>
            </div>
        </Link>
    )
}

export default PublicPatternCard
