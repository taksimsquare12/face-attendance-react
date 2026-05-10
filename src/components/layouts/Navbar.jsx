import { Link, NavLink, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import logo from "../../asserts/images/logo.png";
import { applyTheme, getInitialTheme, getNextTheme } from "../../constants/themeConstants";

const mainLinks = [
  { to: "/", label: "Home", end: true },
  { to: "/blog", label: "Blog" },
  { to: "/about", label: "About" },
  { to: "/records", label: "Records" },
  { to: "/contact", label: "Contact" },
];

const itemLinks = [
  { to: "/items/new", label: "Create Item" },
  { to: "/items", label: "Items", end: true },
];

const authLinks = [
  { to: "/signin", label: "Sign In" },
  { to: "/signup", label: "Sign Up" },
];

function navClassName(isActive, isDark) {
  const base = "rounded px-2.5 py-1.5 text-sm font-medium transition-colors";
  if (isDark) {
    return `${base} ${isActive ? "bg-cyan-500/20 text-cyan-400" : "text-gray-200 hover:text-cyan-400"}`;
  }
  return `${base} ${isActive ? "bg-cyan-100 text-cyan-700" : "text-gray-800 hover:text-cyan-600"}`;
}

function Navbar() {
  const location = useLocation();
  const [theme, setTheme] = useState(getInitialTheme);
  const [mobileOpen, setMobileOpen] = useState(false);
  const isDark = theme === "dark";

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  const shell = isDark
    ? "border-gray-700 bg-black/70 text-white backdrop-blur-lg"
    : "border-gray-200 bg-white/90 text-gray-900 shadow-sm backdrop-blur-lg";

  return (
    <header className={`sticky top-0 z-50 border-b ${shell}`}>
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-3">
        <Link to="/" className="flex items-center gap-2" onClick={() => setMobileOpen(false)}>
          <img src={logo} alt="" className="h-8 w-8 object-contain" width={32} height={32} />
          <span className="font-bold text-xl text-cyan-400">AI Attendance</span>
        </Link>

        <div className="flex items-center gap-2 md:hidden">
          <button
            type="button"
            onClick={() => setTheme((t) => getNextTheme(t))}
            className={`rounded px-3 py-1.5 text-sm font-medium text-white ${
              isDark ? "bg-cyan-500 hover:bg-cyan-400" : "bg-purple-500 hover:bg-purple-400"
            }`}
          >
            Theme
          </button>
          <button
            type="button"
            className={`rounded px-3 py-1.5 text-sm ${
              isDark ? "bg-gray-800 text-white" : "bg-gray-100 text-gray-900"
            }`}
            onClick={() => setMobileOpen((o) => !o)}
            aria-expanded={mobileOpen}
            aria-label="Toggle menu"
          >
            Menu
          </button>
        </div>

        <nav
          className={`${
            mobileOpen ? "flex" : "hidden"
          } w-full flex-col gap-1 md:flex md:w-auto md:flex-row md:flex-wrap md:items-center md:gap-1 lg:gap-2`}
        >
          {mainLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className={({ isActive }) => navClassName(isActive, isDark)}
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </NavLink>
          ))}
          <span
            className={`mx-1 hidden h-4 w-px md:inline-block ${isDark ? "bg-gray-600" : "bg-gray-300"}`}
            aria-hidden
          />
          {itemLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className={({ isActive }) => navClassName(isActive, isDark)}
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </NavLink>
          ))}
          <span
            className={`mx-1 hidden h-4 w-px md:inline-block ${isDark ? "bg-gray-600" : "bg-gray-300"}`}
            aria-hidden
          />
          {authLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) => navClassName(isActive, isDark)}
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </NavLink>
          ))}
          <NavLink
            to="/page-not-found"
            className={({ isActive }) => navClassName(isActive, isDark)}
            onClick={() => setMobileOpen(false)}
          >
            404 Demo
          </NavLink>
        </nav>

        <div className="hidden items-center md:flex">
          <button
            type="button"
            onClick={() => setTheme((t) => getNextTheme(t))}
            className={`rounded px-3 py-1.5 text-sm font-medium text-white ${
              isDark ? "bg-cyan-500 hover:bg-cyan-400" : "bg-purple-500 hover:bg-purple-400"
            }`}
          >
            Toggle theme
          </button>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
