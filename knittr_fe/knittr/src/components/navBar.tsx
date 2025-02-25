import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faBookOpen,
    faPlus,
    faMagnifyingGlass,
    faGear
} from '@fortawesome/free-solid-svg-icons'

// TODO add navigation
// TODO add scoped styling
const NavBar = () => {
    return (
        <nav>
            <FontAwesomeIcon icon={faBookOpen} />
            <FontAwesomeIcon icon={faPlus} />
            <FontAwesomeIcon icon={faMagnifyingGlass} />
            <FontAwesomeIcon icon={faGear} />
        </nav>
    )
}

export default NavBar;
