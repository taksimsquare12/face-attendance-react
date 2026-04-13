import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { applyTheme, getInitialTheme, getNextTheme } from "../constants/themeConstants";

const logo = "/favicon.svg";
const FORMSPREE_ACTION = "https://formspree.io/f/mlgporvy";

const alertStyles = {
  success: "text-green-800 bg-green-50 dark:bg-gray-700 dark:text-green-400",
  error: "text-red-800 bg-red-50 dark:bg-gray-700 dark:text-red-400",
  info: "text-blue-800 bg-blue-50 dark:bg-gray-700 dark:text-blue-400",
};

const inputBase =
  "w-full p-2 rounded bg-black dark:bg-white border text-white dark:text-black placeholder:text-gray-500 focus:ring-2 focus:ring-cyan-400 outline-none";

function fieldBorderClass(value, dirty) {
  if (!dirty) return "border-gray-700 dark:border-gray-300";
  return value.trim() ? "border-green-500" : "border-red-500";
}

function ContactPage() {
  const [theme, setTheme] = useState(getInitialTheme);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [dirty, setDirty] = useState({ name: false, email: false, message: false });
  const [alert, setAlert] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  useEffect(() => {
    console.log("Contact Page Loaded ✅");
  }, []);

  useEffect(() => {
    if (!alert) return undefined;
    const t = window.setTimeout(() => setAlert(null), 4000);
    return () => clearTimeout(t);
  }, [alert]);

  useEffect(() => {
    if (!modalOpen) return undefined;
    const onKey = (e) => {
      if (e.key === "Escape") setModalOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [modalOpen]);

  const showAlert = (msg, type) => {
    setAlert({ msg, type });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const n = name.trim();
    const em = email.trim();
    const m = message.trim();

    if (n === "" || !em.includes("@") || m === "") {
      showAlert("❌ Please fill all fields correctly.", "error");
      return;
    }

    setSubmitting(true);
    showAlert("⏳ Sending message...", "info");

    const formData = new FormData();
    formData.append("_subject", "New Contact Message");
    formData.append("name", n);
    formData.append("email", em);
    formData.append("message", m);

    try {
      const response = await fetch(FORMSPREE_ACTION, {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      });

      if (response.ok) {
        showAlert("✅ Message sent successfully!", "success");
        setName("");
        setEmail("");
        setMessage("");
        setDirty({ name: false, email: false, message: false });
      } else {
        showAlert("❌ Error sending message.", "error");
      }
    } catch {
      showAlert("❌ Network error. Try again.", "error");
    } finally {
      setSubmitting(false);
    }
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
          <Link to="/blog" className="hover:text-cyan-400">
            Blog
          </Link>
          <Link to="/about" className="hover:text-cyan-400">
            About
          </Link>
          <Link to="/contact" className="text-cyan-400">
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

      <main>
        <section className="text-center py-16 bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
          <h1 className="text-4xl font-bold text-cyan-400 mb-2">Contact Us</h1>
          <p className="text-gray-300 dark:text-gray-600">Get in touch with our AI system team</p>
        </section>

        <section className="max-w-xl mx-auto bg-gray-900 dark:bg-gray-100 p-8 shadow-lg mt-10 mb-10 rounded-xl">
          <h2 className="text-2xl font-bold mb-6 text-center text-purple-400">Send Message</h2>

          {alert && (
            <div className={`p-4 mb-4 text-sm rounded-lg ${alertStyles[alert.type]}`}>{alert.msg}</div>
          )}

          <form onSubmit={handleSubmit} noValidate>
            <div className="mb-4">
              <label htmlFor="name" className="block text-cyan-400 font-bold mb-1">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                aria-label="Full Name"
                required
                placeholder="Enter your full name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  setDirty((d) => ({ ...d, name: true }));
                }}
                className={`${inputBase} ${fieldBorderClass(name, dirty.name)}`}
              />
            </div>

            <div className="mb-4">
              <label htmlFor="email" className="block text-cyan-400 font-bold mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                aria-label="Email Address"
                required
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setDirty((d) => ({ ...d, email: true }));
                }}
                className={`${inputBase} ${fieldBorderClass(email, dirty.email)}`}
              />
            </div>

            <div className="mb-4">
              <label htmlFor="message" className="block text-cyan-400 font-bold mb-1">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                aria-label="Message"
                required
                rows={4}
                placeholder="Write your message here..."
                value={message}
                onChange={(e) => {
                  setMessage(e.target.value);
                  setDirty((d) => ({ ...d, message: true }));
                }}
                className={`${inputBase} ${fieldBorderClass(message, dirty.message)}`}
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-2 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg hover:scale-105 transition text-white disabled:opacity-60 disabled:hover:scale-100"
            >
              Send Message
            </button>
          </form>

          <div className="text-center mt-6">
            <button
              type="button"
              onClick={() => setModalOpen(true)}
              className="px-4 py-2 bg-gray-700 hover:bg-cyan-500 rounded text-white"
            >
              More Info
            </button>
          </div>
        </section>
      </main>

      {modalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-20 bg-black/60"
          role="dialog"
          aria-modal="true"
          aria-labelledby="contact-modal-title"
          onClick={() => setModalOpen(false)}
        >
          <div
            className="bg-gray-900 dark:bg-gray-100 text-white dark:text-black p-6 rounded-lg max-w-md w-full text-center shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 id="contact-modal-title" className="text-lg font-bold mb-4">
              Contact Info
            </h3>
            <p>Email: support@attendanceapp.com</p>
            <p>Phone: +92-300-1234567</p>
            <button
              type="button"
              onClick={() => setModalOpen(false)}
              className="mt-4 px-4 py-2 bg-gradient-to-r from-cyan-500 to-purple-500 rounded text-white"
            >
              Close
            </button>
          </div>
        </div>
      )}

      <footer className="bg-black text-white text-center p-5 mt-10 border-t border-gray-700 dark:bg-black dark:text-white">
        <p>© 2026 AI Attendance System</p>
      </footer>
    </div>
  );
}

export default ContactPage;
