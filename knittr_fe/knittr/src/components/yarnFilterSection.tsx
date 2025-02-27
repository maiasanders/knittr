import { ChangeEventHandler } from "react"
import { Yarn } from "../helpers/apiResponseTypes"
import FilterToggle from "./FilterToggle"

const YarnFilterSection = ({ yarns, selectedYarns, handleToggle }: { yarns: Yarn[], selectedYarns: Set<number>, handleToggle: ChangeEventHandler }) => {
    return (
        <section>
            <h3>Yarns</h3>
            <div>
                {yarns.map(y => <FilterToggle
                    id={`s.${y.yarnId}`}
                    name={y.name}
                    value={y.yarnId}
                    isSelected={selectedYarns.has(y.yarnId)}
                    onToggle={handleToggle}
                />)}
            </div>
        </section>
    )
}

export default YarnFilterSection
