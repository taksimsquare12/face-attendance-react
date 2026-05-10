import { Route, Routes } from "react-router-dom";
import Navbar from "./components/layouts/Navbar";
import AboutPage from "./pages/AboutPage";
import BlogPage from "./pages/BlogPage";
import ContactPage from "./pages/ContactPage";
import CreateItemPage from "./pages/CreateItemPage";
import EditItemPage from "./pages/EditItemPage";
import HomePage from "./pages/HomePage";
import PageNotFound from "./pages/PageNotFound";
import RecordsPage from "./pages/RecordsPage";
import SignInPage from "./pages/SigninPage";
import SignUpPage from "./pages/SignupPage";
import ViewAllItemsPage from "./pages/ViewAllItemsPage";
import ViewSingleItemPage from "./pages/ViewSingleItemPage";

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/records" element={<RecordsPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/items/new" element={<CreateItemPage />} />
        <Route path="/items" element={<ViewAllItemsPage />} />
        <Route path="/items/:id" element={<ViewSingleItemPage />} />
        <Route path="/items/:id/edit" element={<EditItemPage />} />
        <Route path="/page-not-found" element={<PageNotFound />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default App;
