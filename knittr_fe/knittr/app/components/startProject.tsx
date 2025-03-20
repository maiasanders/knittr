import { useState } from "react";
import { Pattern, ProjectStartDto, Variant } from "../helpers/apiResponseTypes";
import useVariant from "../hooks/useVariant";
import { useNavigate } from "react-router-dom";

// export async function clientAction({ request }: Route)

export default function StartProject({ pattern }: { pattern: Pattern }) {
    const [sizeId, setSizeId] = useState<number>();
    const [yarnId, setYarnId] = useState<number>();

    // use a map to filter to unique sizes on pattern in case of overlapping variants
    const uniqueSizes = [...new Map(pattern.variants.map(v => [v.size.sizeId, v.size])).values()]

    const { startProject, project } = useVariant()

    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault();
        const variant: Variant = pattern.variants
            .filter(v => v.size.sizeId === sizeId && v.yarn.yarnId === yarnId)[0]
        const dto: ProjectStartDto = {
            variantId: variant.variantId,
            isTemplate: false
        }
        startProject(dto)
        if (typeof project !== 'undefined') navigate(`/projects/${project.projectId}`)
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
                <button type="submit" className="btn btn-primary">Start!</button>
            </form>
        </div>
    )
}
