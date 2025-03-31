import { Row } from "../../helpers/apiResponseTypes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import './rowByRowItem.css'

const RowByRowItem = ({ row, offset, isActive }: { row: Row, offset: number, isActive: boolean }) => (
    <tr>
        <td>{row.rowNum + offset}</td>
        <td className="directions">
            <p>{row.directions}</p>
            {isActive ? <FontAwesomeIcon icon={faLocationDot} /> : null}
        </td>
    </tr>
)

export default RowByRowItem
