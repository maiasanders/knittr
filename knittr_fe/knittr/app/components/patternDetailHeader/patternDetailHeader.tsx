import { faArrowLeft, faStar as solidStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as emptyStar } from "@fortawesome/free-regular-svg-icons"
import { Pattern } from "../../helpers/apiResponseTypes";
import ClickableIcon from "../clickableIcon/clickableIcon";
import usePatterns from "../../hooks/usePatterns";
import CategoryTag from "../categorytag/categoryTag";
import './patternDetailHeader.css'
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const PatternDetailHeader = ({ pattern, isLoggedIn }: { pattern: Pattern, isLoggedIn: boolean }) => {

    const { savedPatterns, savePattern, unsavePattern } = usePatterns()

    const navigate = useNavigate();

    const isSaved = savedPatterns ? savedPatterns.map(p => p.patternId).includes(pattern.patternId) : false;

    return (
        <header>
            <ClickableIcon icon={faArrowLeft} handleClick={() => navigate(-1)} />
            <div id="name-auth-fav">
                <h1>{pattern.name}</h1>
                <h2>{pattern.author.username}</h2>
                {isLoggedIn ? (
                    <ClickableIcon icon={isSaved ? solidStar : emptyStar} handleClick={() => isSaved ? unsavePattern(pattern) : savePattern(pattern)} />
                ) : null}
            </div>
            <div id="categories">
                {pattern.categories.map(c => (<CategoryTag name={c.category_name} key={c.categoryId} />))}
            </div>
        </header>
    )
}

export default PatternDetailHeader
