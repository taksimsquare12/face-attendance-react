export const THEME_COLORS = {
  dark: {
    name: "dark",
    nav: "bg-gray-800",
    text: "text-white",
    button: "bg-cyan-500 text-white",
  },
  light: {
    name: "light",
    nav: "bg-gray-100",
    text: "text-black",
    button: "bg-purple-500 text-white",
  },
};

export const THEME_STORAGE_KEY = "attendance-theme";

export function getNextTheme(themeName) {
  return themeName === "dark" ? "light" : "dark";
}

export function getInitialTheme() {
  const saved = window.localStorage.getItem(THEME_STORAGE_KEY);
  return saved === "light" ? "light" : "dark";
}

export function applyTheme(themeName) {
  const root = document.documentElement;
  root.classList.toggle("dark", themeName === "dark");
  window.localStorage.setItem(THEME_STORAGE_KEY, themeName);
}

export function initializeTheme() {
  const theme = getInitialTheme();
  applyTheme(theme);
  return theme;
}
