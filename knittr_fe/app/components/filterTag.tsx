import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

const FilterTag = ({ filter, selected }: { filter: string, selected: boolean }) => <div className="filter tag">{filter} {selected ? <FontAwesomeIcon icon={faXmark} /> : null}</div>

export default FilterTag
