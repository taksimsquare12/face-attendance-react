import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { applyTheme, getNextTheme, THEME_COLORS } from "../../constants/themeConstants";

const links = [
  { to: "/", label: "Home" },
  { to: "/blog", label: "Blog" },
  { to: "/about", label: "About" },
  { to: "/records", label: "Records" },
  { to: "/contact", label: "Contact" },
  { to: "/signin", label: "Sign In" },
  { to: "/signup", label: "Sign Up" },
  { to: "/items/new", label: "Create Item" },
  { to: "/items", label: "View All Items" },
];

function Navbar() {
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  const activeTheme = THEME_COLORS[theme];

  return (
    <nav className={`${activeTheme.nav} ${activeTheme.text} sticky top-0 z-10 border-b`}>
      <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-2 px-4 py-3">
        <span className="mr-3 text-lg font-bold">Attendance + Items</span>
        {links.map((link) => (
          <NavLink
            key={`${link.to}-${link.label}`}
            to={link.to}
            className={({ isActive }) =>
              `rounded px-3 py-1.5 text-sm font-medium ${
                isActive ? "bg-black text-white" : "hover:bg-white/20"
              }`
            }
          >
            {link.label}
          </NavLink>
        ))}
        <button
          type="button"
          onClick={() => setTheme((current) => getNextTheme(current))}
          className={`ml-auto rounded px-3 py-1 text-sm ${activeTheme.button}`}
        >
          Toggle Theme
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
