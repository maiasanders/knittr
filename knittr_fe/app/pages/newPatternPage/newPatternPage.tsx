import { Form } from "react-router";
import { redirect } from "react-router-dom"
import type { Route } from "./+types/newPatternPage"
import { Category, PatternDto } from "../../helpers/apiResponseTypes";
import patternService from "../../services/patternService";
import { useState, ChangeEvent } from "react";

import './newPatternPage.css'
import CategorySelector from "../../components/categorySelector/categorySelector";

export async function clientAction({ request, params }: Route.ClientActionArgs) {

    const formData = await request.formData()
    const pattern = Object.fromEntries(formData) as PatternDto

    if (params.id === '0') {
        const response = await patternService.create(pattern)
        if (response.status === 201) return redirect(`/patterns/${response.data.patternId}/variants`)
        error = "Error submitting pattern, check things over and try again"
    } else {
        const response = await patternService.update(params.id, pattern)
        if (response.status === 200) return redirect('/patterns/mine')
        error = "Unable to save some or all updates"
    }
}

export async function clientLoader({ params }: { params: Route.LoaderArgs }) {
    let pattern
    if (params.id > 0) {
        pattern = await patternService.getById(params.id).then(r => r.data)
    }
    return { pattern }
}

let error = '';

export default function NewPatternPage({ loaderData }: Route.ComponentProps) {

    const { pattern } = loaderData

    const [name, setName] = useState(typeof pattern !== 'undefined' ? pattern.name : "")
    const [desc, setDesc] = useState(typeof pattern !== 'undefined' ? pattern.desc : "")
    const [selectedCats, setSelectedCats] = useState<number[]>(typeof pattern !== 'undefined' ? pattern.categories.map((c: Category) => c.categoryId) : []);


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
        <main>
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
                <CategorySelector
                    selectedCats={selectedCats}
                    handleCheck={handleCheck}
                />

                <button type="submit" className="btn btn-primary btn-big" id="create-ptrn">
                    {typeof pattern === 'undefined' ? "Create Pattern!" : "Save changes"}
                </button>
            </Form>
        </main>
    )
}
