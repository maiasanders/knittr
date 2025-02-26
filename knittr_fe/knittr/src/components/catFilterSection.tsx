import { ToggleEventHandler } from "react";
import { Category } from "../helpers/apiResponseTypes";
import FilterToggle from "./FilterToggle";

const CatFilterSection = ({ cats, selectedCats, handleToggle }: { cats: Category[], selectedCats: Set<number>, handleToggle: ToggleEventHandler }) => {
    return (
        <section>
            <h3>Categories</h3>
            <div>
                {cats.map(c => <FilterToggle
                    id={`c${c.categoryId}`}
                    name={c.category_name}
                    value={c.categoryId}
                    isSelected={selectedCats.has(c.categoryId)}
                    onToggle={handleToggle}
                />)}
            </div>
        </section>
    )
}

export default CatFilterSection
