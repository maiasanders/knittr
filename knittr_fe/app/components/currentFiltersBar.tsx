import React from "react"
import { Category } from "../helpers/apiResponseTypes"

const CurrentFiltersBar = ({ selectedCats, removeCat }: {
    selectedCats: Category[],
    removeCat: React.MouseEventHandler<HTMLDivElement>
}) => {
    // TODO implement once I've nailed down how...
    return (<div id="current-filters">
        {selectedCats.map(cat => (
            <div
                className="category-tag btn btn-primary"
                onClick={removeCat}
                key={`cat-${cat.categoryId}`}
                id={`cat-${cat.categoryId}`}
            >
                {cat.category_name} X
            </div>
        ))}
    </div>)
}

export default CurrentFiltersBar
