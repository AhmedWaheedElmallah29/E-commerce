import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * ScrollToTop Component.
 * Automatically scrolls the window to the top whenever the route (pathname) changes.
 * Used to ensure users start at the top of the page when navigating.
 */
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export default ScrollToTop;
