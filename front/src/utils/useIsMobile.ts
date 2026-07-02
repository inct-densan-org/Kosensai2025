import {useEffect, useState} from "react";

const THRESHOLD_WIDTH = 1024
export const useIsMobile = () => {
    const [isMobile, setIsMobile] = useState<null | boolean>(null);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= THRESHOLD_WIDTH);
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return isMobile;
}