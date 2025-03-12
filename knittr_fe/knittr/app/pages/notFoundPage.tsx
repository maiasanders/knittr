import { useNavigate } from "react-router-dom"
import ClickableIcon from "../components/clickableIcon"
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons"

const NotFoundPage = () => {

    const navigate = useNavigate();

    return (<>
        <h4>Oops!</h4>
        <h5>It looks like the page you're looking for doesn't exist</h5>
        <ClickableIcon icon={faArrowLeft} handleClick={() => navigate(-1)} />
    </>)
}

export default NotFoundPage
