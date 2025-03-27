import { Category } from "../../helpers/apiResponseTypes";
import './catFilterSection.css'

const CatFilterSection = ({ cats, selectedCats, handleToggle }: {
    cats: Category[],
    selectedCats: number[],
    handleToggle: (cat: Category) => void
}) => {
    return (
        <section>
            <h5>Categories</h5>
            <div id="cat-filters" className="filter-list">
                {cats.map(c => (<div key={c.categoryId}>
                    <input
                        type="checkbox"
                        className="btn-check"
                        id={`cat-${c.categoryId}-check`}
                        checked={selectedCats.includes(c.categoryId)}
                        onChange={() => handleToggle(c)}
                        value={c.categoryId}
                    />
                    <label className="btn btn-primary" htmlFor={`cat-${c.categoryId}-check`}>{c.category_name}</label>
                </div>))}
            </div>
        </section>
    )
}

export default CatFilterSection
