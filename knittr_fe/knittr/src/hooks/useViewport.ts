import { useEffect, useState } from "react";

const setWindowDimensions = () => { return { w: window.innerWidth, h: window.innerHeight } }

const useViewport = () => {
    const [viewport, setViewport] = useState(setWindowDimensions)

    useEffect(() => {
        window.addEventListener("resize", () => setViewport(setWindowDimensions))
    })

    return viewport
}

export default useViewport
