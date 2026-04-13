import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { initializeTheme } from "./constants/themeConstants";

const favicon = "/favicon.svg";

initializeTheme();
const faviconTag = document.querySelector("link[rel='icon']");
if (faviconTag) {
  faviconTag.setAttribute("href", favicon);
}

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
