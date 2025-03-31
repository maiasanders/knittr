import { useState } from "react";
import { Pattern, Project, ProjectStartDto, Variant } from "../helpers/apiResponseTypes";
import useVariant from "../hooks/useVariant";
import { redirect, useNavigate } from "react-router-dom";
import LoadingSpinner from "./loadingSpinner/loadingSpinner";
import projectService from "../services/projectService";

// export async function clientAction({ request }: Route)

export default function StartProject({ pattern }: { pattern: Pattern }) {
    const [sizeId, setSizeId] = useState<number>();
    const [yarnId, setYarnId] = useState<number>();
    const [projectId, setProjectId] = useState<number>()
    const [loading, setLoading] = useState(false)

    // use a map to filter to unique sizes on pattern in case of overlapping variants
    const uniqueSizes = [...new Map(pattern.variants.map(v => [v.size.sizeId, v.size])).values()]

    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('entering handler')
        setLoading(true)
        const variant: Variant = pattern.variants
            .filter(v => v.size.sizeId === sizeId && v.yarn.yarnId === yarnId)[0]
        const dto: ProjectStartDto = {
            variantId: variant.variantId,
            isTemplate: false
        }
        projectService.create(dto).then(r => {
            navigate(`/projects/${r.data.projectId}`)
        })
    }

    return (
        <div id="project-start">
            <form onSubmit={handleSubmit}>
                <select
                    id="select-size"
                    className="form-select"
                    name="sizeId"
                    onChange={e => setSizeId(parseInt(e.target.value))}
                >
                    <option selected disabled>Choose size</option>
                    {uniqueSizes.map(size => (
                        <option
                            value={size.sizeId}
                            key={`size-${size.sizeId}`}
                        >
                            {size.ageRange ? `${size.ageRange} ` : ''}{size.name}
                        </option>
                    ))}
                </select>
                {sizeId !== null ? (
                    <select
                        name="yarnId"
                        id="yarnId"
                        className="form-select"
                        onChange={e => setYarnId(parseInt(e.target.value))}
                    >
                        <option selected disabled>Choose yarn</option>
                        {pattern.variants.filter(v => v.size.sizeId === sizeId).map(v => (
                            <option
                                value={v.yarn.yarnId}
                                key={`yarn-${v.yarn.yarnId}`}
                            >
                                {v.yarn.name}
                            </option>
                        ))}
                    </select>
                ) : null}
                <button type="button" className="btn btn-primary" onClick={handleSubmit} disabled={!yarnId || !sizeId}>{loading && (<LoadingSpinner />)} Start!</button>
            </form>
        </div>
    )
}
