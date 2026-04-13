import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { applyTheme, getInitialTheme, getNextTheme } from "../constants/themeConstants";

const logo = "/favicon.svg";
const categories = ["AI Technology", "Education", "Security", "Innovation"];

const articles = [
  {
    id: "1",
    title: "AI in Attendance Systems",
    titleClass: "text-cyan-400",
    body: "Facial recognition is transforming attendance with accuracy, automation, and enhanced security.",
    tags: [
      { label: "AI", pill: "bg-green-500/20 text-green-400" },
      { label: "Education", pill: "bg-blue-500/20 text-blue-400" },
    ],
  },
  {
    id: "2",
    title: "Benefits of Automation",
    titleClass: "text-purple-400",
    body: "Automation reduces manual workload and allows educators to focus on teaching instead of paperwork.",
    tags: [
      { label: "Automation", pill: "bg-yellow-500/20 text-yellow-400" },
      { label: "Innovation", pill: "bg-pink-500/20 text-pink-400" },
    ],
  },
];

const recentPosts = ["AI vs Traditional", "Future of Education", "Security Challenges"];

function articleSearchBlob(a) {
  return `${a.title} ${a.body} ${a.tags.map((t) => t.label).join(" ")}`.toLowerCase();
}

function BlogPage() {
  const [theme, setTheme] = useState(getInitialTheme);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState(null);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  useEffect(() => {
    console.log("Blog Page Loaded ✅");
  }, []);

  useEffect(() => {
    if (!toast) return undefined;
    const t = window.setTimeout(() => setToast(null), 3000);
    return () => clearTimeout(t);
  }, [toast]);

  const visibleArticles = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (q) {
      return articles.filter((a) => articleSearchBlob(a).includes(q));
    }
    if (activeCategory) {
      const cat = activeCategory.toLowerCase();
      const matched = articles.filter((a) => articleSearchBlob(a).includes(cat));
      return matched.length ? matched : articles;
    }
    return articles;
  }, [searchQuery, activeCategory]);

  const visibleIds = useMemo(() => new Set(visibleArticles.map((a) => a.id)), [visibleArticles]);

  const handleCategoryClick = (e, name) => {
    e.preventDefault();
    setActiveCategory(name);
  };

  const handleRecentClick = (e, title) => {
    e.preventDefault();
    setToast(`📖 Opening: ${title}`);
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white dark:bg-white dark:text-black">
      <header className="bg-black/70 backdrop-blur-lg p-4 flex flex-wrap justify-between items-center gap-4 border-b border-gray-700">
        <div className="flex items-center gap-2">
          <img src={logo} alt="AI Attendance Logo" className="h-8 w-8" />
          <h1 className="font-bold text-xl text-cyan-400">AI Attendance</h1>
        </div>

        <button
          type="button"
          className="md:hidden px-3 py-1 rounded bg-gray-800 text-sm"
          onClick={() => setMobileOpen((o) => !o)}
          aria-expanded={mobileOpen}
        >
          Menu
        </button>

        <nav
          className={`${mobileOpen ? "flex" : "hidden"} md:flex flex-col md:flex-row gap-4 md:gap-6 w-full md:w-auto`}
        >
          <Link to="/" className="hover:text-cyan-400">
            Home
          </Link>
          <Link to="/blog" className="text-cyan-400">
            Blog
          </Link>
          <Link to="/about" className="hover:text-cyan-400">
            About
          </Link>
          <Link to="/contact" className="hover:text-cyan-400">
            Contact
          </Link>
          <Link to="/records" className="hover:text-cyan-400">
            Records
          </Link>
        </nav>

        <div className="flex flex-wrap items-center gap-4 w-full md:w-auto justify-end">
          <Link to="/signin" className="hover:text-cyan-400">
            Sign In
          </Link>
          <Link
            to="/signup"
            className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg text-white"
          >
            Sign Up
          </Link>
          <Link to="/page-not-found" className="hover:text-cyan-400">
            PageNotFound
          </Link>
          <button
            type="button"
            onClick={() => setTheme((current) => getNextTheme(current))}
            className="px-3 py-1 bg-cyan-500 rounded text-white"
          >
            Toggle
          </button>
        </div>
      </header>

      <section className="text-center py-16 bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
        <h1 className="text-4xl font-bold text-cyan-400 mb-2">AI &amp; Attendance Blog</h1>
        <p className="text-gray-300 dark:text-gray-600">Explore latest insights in AI, automation &amp; education</p>
      </section>

      <main className="grid grid-cols-1 md:grid-cols-4 gap-6 p-10">
        <aside className="md:col-span-1 bg-gray-900 dark:bg-gray-100 p-4 rounded-xl shadow-lg">
          <h2 className="text-xl font-bold text-cyan-400 mb-4">Categories</h2>
          <ul className="space-y-2 text-gray-300 dark:text-gray-700">
            {categories.map((name) => (
              <li key={name}>
                <a
                  href="#"
                  onClick={(e) => handleCategoryClick(e, name)}
                  className={`hover:text-cyan-400 ${activeCategory === name ? "text-cyan-400" : ""}`}
                >
                  {name}
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-6">
            <input
              type="text"
              placeholder="Search..."
              aria-label="Search blog posts"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full p-2 rounded bg-black dark:bg-white border border-gray-700 dark:border-gray-300 text-white dark:text-black placeholder:text-gray-500 focus:ring-2 focus:ring-cyan-400 outline-none"
            />
          </div>
        </aside>

        <section className="md:col-span-2 space-y-6">
          <div className="p-4 text-blue-300 bg-gray-900 dark:bg-gray-100 rounded-lg border border-blue-500">
            Latest articles on AI and smart attendance systems
          </div>

          {toast && (
            <div className="p-4 text-sm text-blue-300 rounded-lg bg-gray-900 dark:bg-gray-100 border border-blue-500">
              {toast}
            </div>
          )}

          {articles.map((article) => {
            const visible = visibleIds.has(article.id);
            return (
              <article
                key={article.id}
                className={`bg-gray-900 dark:bg-gray-100 p-6 rounded-xl hover:scale-105 transition shadow-lg ${
                  visible ? "" : "hidden"
                }`}
              >
                <h2 className={`text-2xl font-bold ${article.titleClass}`}>{article.title}</h2>
                <p className="mt-2 text-gray-300 dark:text-gray-700">{article.body}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {article.tags.map((tag) => (
                    <span key={tag.label} className={`${tag.pill} px-2 py-1 rounded text-sm`}>
                      {tag.label}
                    </span>
                  ))}
                </div>
              </article>
            );
          })}

          <div className="flex justify-center mt-6 gap-2">
            <button type="button" className="px-3 py-1 bg-gray-800 rounded hover:bg-cyan-500" aria-label="Page 1">
              1
            </button>
            <button type="button" className="px-3 py-1 bg-gray-800 rounded hover:bg-cyan-500" aria-label="Page 2">
              2
            </button>
            <button type="button" className="px-3 py-1 bg-gray-800 rounded hover:bg-cyan-500" aria-label="Next Page">
              Next
            </button>
          </div>
        </section>

        <aside className="md:col-span-1 bg-gray-900 dark:bg-gray-100 p-4 rounded-xl shadow-lg">
          <h2 className="text-xl font-bold text-purple-400 mb-4">Recent Posts</h2>
          <ul className="space-y-2 text-gray-300 dark:text-gray-700">
            {recentPosts.map((title) => (
              <li key={title}>
                <a
                  href="#"
                  onClick={(e) => handleRecentClick(e, title)}
                  className="hover:text-purple-400"
                >
                  {title}
                </a>
              </li>
            ))}
          </ul>
        </aside>
      </main>

      <footer className="bg-black text-white text-center p-5 mt-10 border-t border-gray-700 dark:bg-black dark:text-white">
        <p>© 2026 AI Attendance System</p>
      </footer>
    </div>
  );
}

export default BlogPage;
