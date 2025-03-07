import { NavLink } from 'react-router-dom'

// TODO add routing info
// TODO add ability to highlight current page
const SavedTabs = () => (
    <div id="saved-tabs">
        <NavLink to={'/projects'}><h3>In Progress</h3></NavLink>
        <NavLink to={'/patterns/saved'}><h3>Saved</h3></NavLink>
        <NavLink to={'/patterns/mine'}><h3>My Patterns</h3></NavLink>
    </div>
)

export default SavedTabs;
