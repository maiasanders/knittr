import { Form } from "react-router";
import { redirect } from "react-router-dom"
import type { Route } from "./+types/newPatternPage"
import { PatternDto } from "../helpers/apiResponseTypes";
import patternService from "../services/patternService";
import { useState, MouseEvent, ChangeEvent } from "react";
import categoryService from "../services/categoryService";

// TODO update to be able to edit existing pattern?
export async function loader() {
    const categories = await categoryService.getAll().then(res => res.data)
    return { categories }
}

export async function clientAction({ request }: Route.ClientActionArgs) {
    const formData = await request.formData()
    const pattern = Object.fromEntries(formData) as PatternDto
    const response = await patternService.create(pattern)

    if (response.status === 201) return redirect(`/patterns/new/${response.data.patternId}/variants`)

    error = "Error submitting pattern, check things over and try again"
}

let error = '';

export default function NewPatternPage({ loaderData }: Route.loaderData) {
    const { categories } = loaderData

    // const [error, setError] = useState("")
    const [name, setName] = useState("")
    const [desc, setDesc] = useState("")
    const [selectedCats, setSelectedCats] = useState<number[]>([]);

    const handleCheck = (e: ChangeEvent<HTMLInputElement>) => {
        const id = parseInt(e.currentTarget.value)
        if (selectedCats.includes(id)) {
            const updatedCats = selectedCats.filter(n => n !== id)
            setSelectedCats(updatedCats)
        } else {
            setSelectedCats([...selectedCats, id])
        }
    }

    return (
        <>
            <p className={error ? "show-error" : ''} id="pattern-submit-error">{error}</p>
            <Form method="post">
                <div className="form-floating">
                    <input
                        type="text"
                        name="name"
                        id="pattern-name"
                        placeholder="Pattern Name"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        className="form-control"
                    />
                    <label htmlFor="pattern-name">Pattern Name</label>
                </div>
                <div className="form-floating">
                    <textarea
                        name="desc"
                        id="pattern-desc"
                        placeholder="Write a description here"
                        className="form-control"
                        value={desc}
                        onChange={e => setDesc(e.target.value)}
                    />
                    <label htmlFor="pattern-desc">Description</label>
                </div>
                {/* TODO add way to de/select categories */}
                <fieldset>
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
                </fieldset>
                <button type="submit" className="btn btn-primary">Create Pattern!</button>
            </Form>
        </>
    )
}
