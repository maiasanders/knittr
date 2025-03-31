import { useEffect, useState } from "react"

const useUsername = () => {
    const [username, setUsername] = useState('')

    useEffect(() => setUsername(localStorage.getItem('user') || ''))

    return username
}

export default useUsername
