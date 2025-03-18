import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faBookOpen,
    faMagnifyingGlass,
    faRightToBracket

} from '@fortawesome/free-solid-svg-icons'
import { NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './navBar.css'
import useViewport from '../../hooks/useViewport';

// TODO add navigation to settings once made
const NavBar = () => {

    const [loggedIn, setLoggedIn] = useState<boolean>(false);

    useEffect(() => {
        if (localStorage.getItem("token")) setLoggedIn(true)
    }, [])

    const { w } = useViewport()

    return (
        <nav>
            <NavLink to="/projects" ><FontAwesomeIcon icon={faBookOpen} />{w > 768 && '  My Projects & Patterns'}</NavLink>
            <NavLink to="/patterns/discover"><FontAwesomeIcon icon={faMagnifyingGlass} />{w > 768 && ' Discover Patterns'}</NavLink>
            <NavLink to={!loggedIn ? "/login" : "/logout"}>{w > 768 && ` ${loggedIn ? 'Logout' : 'Login'}`}<FontAwesomeIcon icon={faRightToBracket} /></NavLink>
        </nav>
    )
}

export default NavBar;
