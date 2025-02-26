import { Pattern } from "../helpers/apiResponseTypes";

const PublicPatternCard = ({ pattern }: { pattern: Pattern }) => {
    return (
        <div className="pub-pattern-card">
            <img src={pattern.defaultImage.imageLink} alt={pattern.defaultImage.desc} />
            <h4>{pattern.name}</h4>
            <h5>{pattern.author.username}</h5>
            <h6>{pattern.sizes.length > 1 ? `${pattern.sizes.length} Sizes` : `${pattern.sizes[0]}`}</h6>
        </div>
    )
}

export default PublicPatternCard
