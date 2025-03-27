import React, { useState } from "react"
import useCategories from "../../hooks/useCategories"

const CategorySelector = ({ selectedCats, handleCheck }: {
    selectedCats: number[]
    handleCheck: React.ChangeEventHandler
}) => {
    const [showNewCatInput, setShowNewCatInput] = useState(false)
    const [newCatName, setNewCatName] = useState('')

    const { addCategory, categories } = useCategories()


    const handleAdd = () => {
        addCategory(newCatName)
        setNewCatName('')
        setShowNewCatInput(false)
    }

    return (<fieldset>
        <legend>Categories</legend>
        {categories.map(cat => (
            <div key={cat.categoryId}>
                <input
                    type="checkbox"
                    className="btn-check"
                    id={`cat-${cat.categoryId}-check`}
                    checked={selectedCats.includes(cat.categoryId)}
                    onChange={handleCheck}
                    value={cat.categoryId}
                />
                <label className="btn btn-primary" htmlFor={`cat-${cat.categoryId}-check`}>{cat.category_name}</label>
            </div>
        ))}
        {showNewCatInput ? (
            <div className="input-group">
                <input
                    type="text"
                    className="form-control"
                    id="new-cat-input"
                    placeholder="Category name"
                    value={newCatName}
                    onChange={(e) => setNewCatName(e.currentTarget.value)}
                />
                <button
                    type="button"
                    className="btn btn-primary"
                    onClick={handleAdd}
                >
                    Add
                </button>
            </div>
        ) : (<button id="new-cat-btn" type="button" className="btn btn-secondary" onClick={() => setShowNewCatInput(true)}>Add new category</button>)}
    </fieldset>)
}

export default CategorySelector
