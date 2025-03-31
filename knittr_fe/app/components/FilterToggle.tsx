import { ChangeEventHandler } from "react"

const FilterToggle = ({ id, name, isSelected, onToggle, value }: { id: string, name: string, isSelected: boolean, onToggle: ChangeEventHandler, value: number }) => (
    <>
        <input type="checkbox" className="btn-check" id={id} checked={isSelected} onChange={onToggle} value={value} />
        <label className="btn btn-primary" htmlFor={id}>{name}</label>
    </>
)

export default FilterToggle
