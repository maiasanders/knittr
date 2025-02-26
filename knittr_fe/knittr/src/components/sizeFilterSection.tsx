import { ToggleEventHandler } from "react"
import { Size } from "../helpers/apiResponseTypes"
import FilterToggle from "./FilterToggle"

const SizeFilterSection = ({ sizes, selectedSizes, handleToggle }: { sizes: Size[], selectedSizes: Set<number>, handleToggle: ToggleEventHandler }) => {

    return (
        <section>
            <h3>Sizes</h3>
            <div>
                {sizes.map(s => <FilterToggle
                    id={`s${s.sizeId}`}
                    name={s.ageRange ? `${s.name} (${s.ageRange})` : s.name}
                    value={s.sizeId}
                    isSelected={selectedSizes.has(s.sizeId)}
                    onToggle={handleToggle}
                />)}
            </div>
        </section>
    )
}

export default SizeFilterSection
