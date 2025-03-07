import { Row } from "../helpers/apiResponseTypes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";

const RowByRowItem = ({ row, offset, isActive }: { row: Row, offset: number, isActive: boolean }) => (
    <tr>
        <td>{row.rowNum + offset}</td>
        <td>{row.directions}{isActive ? <FontAwesomeIcon icon={faLocationDot} /> : null}</td>
    </tr>
)

export default RowByRowItem
