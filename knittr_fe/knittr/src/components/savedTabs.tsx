import { Link } from 'react-router-dom'

// TODO add routing info
// TODO add ability to highlight current page
const SavedTabs = () => (
    <div id="saved-tabs">
        <Link to={'#'}><h2>In Progress</h2></Link>
        <Link to={'#'}><h2>Saved</h2></Link>
        <Link to={'#'}><h2>My Patterns</h2></Link>
    </div>
)

export default SavedTabs;
