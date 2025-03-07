import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faBookOpen,
    faPlus,
    faMagnifyingGlass,
    faGear,
    faRightToBracket

} from '@fortawesome/free-solid-svg-icons'
import { NavLink } from 'react-router-dom';

// TODO add navigation to settings once made
// TODO add scoped styling
const NavBar = () => {
    return (
        <nav>
            <NavLink to="/projects" ><FontAwesomeIcon icon={faBookOpen} /></NavLink>
            <NavLink to="/patterns/discover"><FontAwesomeIcon icon={faMagnifyingGlass} /></NavLink>
            <NavLink to="/login"><FontAwesomeIcon icon={faRightToBracket} /></NavLink>
        </nav>
    )
}

export default NavBar;
