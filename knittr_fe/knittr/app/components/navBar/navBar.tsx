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

    return (
        <nav>
            <NavLink to="/projects" >
                <FontAwesomeIcon icon={faBookOpen} />
                <span className='hide-in-small'>  My Projects & Patterns</span>
            </NavLink>
            <NavLink to="/patterns/discover">
                <FontAwesomeIcon icon={faMagnifyingGlass} />
                <span className="hide-in-small">Discover Patterns</span>
            </NavLink>
            <NavLink to={!loggedIn ? "/login" : "/logout"}>
                <FontAwesomeIcon icon={faRightToBracket} />
                <span className="hide-in-small">{loggedIn ? 'Logout' : 'Login'}</span>
            </NavLink>
        </nav>
    )
}

export default NavBar;
