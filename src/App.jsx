import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import BlogPage from "./pages/BlogPage";
import AboutPage from "./pages/AboutPage";
import RecordsPage from "./pages/RecordsPage";
import ContactPage from "./pages/ContactPage";
import SignInPage from "./pages/SigninPage";
import SignUpPage from "./pages/SignupPage";
import PageNotFound from "./pages/PageNotFound";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/blog" element={<BlogPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/records" element={<RecordsPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/signin" element={<SignInPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/page-not-found" element={<PageNotFound />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}

export default App;
