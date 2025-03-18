import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faBookOpen,
    faMagnifyingGlass,
    faRightToBracket

} from '@fortawesome/free-solid-svg-icons'
import { NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './navBar.css'

// TODO add navigation to settings once made
// TODO add scoped styling
const NavBar = () => {

    const [loggedIn, setLoggedIn] = useState<boolean>(false);

    useEffect(() => {
        if (localStorage.getItem("token")) setLoggedIn(true)
    }, [])
    // TODO add text for larger screens?

    return (
        <nav>
            <NavLink to="/projects" ><FontAwesomeIcon icon={faBookOpen} /></NavLink>
            <NavLink to="/patterns/discover"><FontAwesomeIcon icon={faMagnifyingGlass} /></NavLink>
            <NavLink to={loggedIn ? "/login" : "/logout"}><FontAwesomeIcon icon={faRightToBracket} /></NavLink>
        </nav>
    )
}

export default NavBar;
