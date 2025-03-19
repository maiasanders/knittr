import { NavLink, Link, useLocation } from 'react-router-dom'
import Dropdown from 'react-bootstrap/Dropdown'
import './savedTabs.css'

const SavedTabs = () => {

    return (
        <>
            <Dropdown className='small-only' id='mobile-dropdown'>
                <Dropdown.Toggle variant='primary'>
                    My patterns and projects
                </Dropdown.Toggle>
                <Dropdown.Menu id='saved-dropdown-menu'>
                    <Dropdown.Item>
                        <NavLink to={'/projects'} id='my-proj'>
                            In Progress
                        </NavLink>
                    </Dropdown.Item>
                    <Dropdown.Item>
                        <NavLink to={'/patterns/saved'} id='saved-ptrns'>
                            Saved
                        </NavLink>
                    </Dropdown.Item>
                    <Dropdown.Item>
                        <NavLink to={'/patterns/mine'} id='my-ptrns'>
                            My Patterns
                        </NavLink>
                    </Dropdown.Item>

                </Dropdown.Menu>
            </Dropdown>

            <div id="saved-tabs" className='hide-in-small'>
                <NavLink to={'/projects'} id='my-proj'><h3>In Progress</h3></NavLink>
                <NavLink to={'/patterns/saved'} id='saved-ptrns'><h3>Saved</h3></NavLink>
                <NavLink to={'/patterns/mine'} id='my-ptrns'><h3>My Patterns</h3></NavLink>
            </div>
        </>
    )
}

export default SavedTabs;
