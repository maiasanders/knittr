import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import './loadingSpinner.css'

const LoadingSpinner = () => {
    // TODO update with something more interesting later
    return (<FontAwesomeIcon icon={faSpinner} className='loading-spinner' />)
}

export default LoadingSpinner;
