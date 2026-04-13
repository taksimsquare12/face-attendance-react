import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { applyTheme, getNextTheme, THEME_COLORS } from "../../constants/themeConstants";

function Navbar() {
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  const activeTheme = THEME_COLORS[theme];

  return (
    <nav className={`${activeTheme.nav} ${activeTheme.text} p-4 flex gap-4`}>
      <Link to="/">Home</Link>
      <Link to="/blog">Blog</Link>
      <Link to="/about">About</Link>
      <Link to="/records">Records</Link>
      <Link to="/contact">Contact</Link>
      <Link to="/signin">Sign In</Link>
      <Link to="/signup">Sign Up</Link>
      <Link to="/page-not-found">PageNotFound</Link>
      <button
        type="button"
        onClick={() => setTheme((current) => getNextTheme(current))}
        className={`px-3 py-1 rounded ${activeTheme.button}`}
      >
        Toggle Theme
      </button>
    </nav>
  );
}

export default Navbar;
