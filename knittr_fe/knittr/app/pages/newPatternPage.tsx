import { Form } from "react-router";
import { redirect } from "react-router-dom"
import type { Route } from "./+types/newPatternPage"
import { PatternDto } from "../helpers/apiResponseTypes";
import patternService from "../services/patternService";
import { useState } from "react";

// TODO update to be able to edit existing pattern?

export async function clientAction({ request }: Route.ClientActionArgs) {
    const formData = await request.formData()
    const pattern = Object.fromEntries(formData) as PatternDto
    const response = await patternService.create(pattern)
    // .then(res => res.status === 201 ? redirect(`/patterns/mine/:${res.data.patternId}`) : error = "Error submitting pattern, check things over and try again")
    if (response.status === 201) return redirect(`/patterns/new/${response.data.patternId}/variants`)

    error = "Error submitting pattern, check things over and try again"
}

let error = '';

export default function NewPatternPage() {

    // const [error, setError] = useState("")
    const [name, setName] = useState("")
    const [desc, setDesc] = useState("")

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
                <button type="submit" className="btn btn-primary">Create Pattern!</button>
            </Form>
        </>
    )
}
