import { useState, useEffect } from "react";

const useWindowSize = () => {
  const [windowWidth, setWindowWidth] = useState<number | any>(undefined);
  const [windowHeight, setWindowHeight] = useState<number | any>(undefined);

  useEffect(() => {
    // Handler to call on window resize
    function handleResize() {
      // Set window width/height to state
      setWindowWidth(window.innerWidth);
      setWindowHeight(window.innerHeight);
    }

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Call handler right away so state gets updated with initial window size
    handleResize();

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []); // Empty array ensures that effect is only run on mount

  return { windowWidth, windowHeight };
};

export default useWindowSize;
