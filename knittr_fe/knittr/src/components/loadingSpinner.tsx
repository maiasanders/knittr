import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'

const LoadingSpinner = () => {
    // TODO add spinning effect with CSS
    // TODO update with something more interesting later
    return (<FontAwesomeIcon icon={faSpinner} />)
}

export default LoadingSpinner;
