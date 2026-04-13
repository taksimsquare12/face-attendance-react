import { Link } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { applyTheme, getInitialTheme, getNextTheme } from "../constants/themeConstants";

const logo = "/favicon.svg";
const googleIcon = "/favicon.svg";
const facebookIcon = "/favicon.svg";
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function SignupPage() {
  const [theme, setTheme] = useState(getInitialTheme);
  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [alert, setAlert] = useState({ text: "", type: "" });
  const [showAlert, setShowAlert] = useState(false);

  const passwordStrength = useMemo(() => {
    let strength = 0;
    if (password.length > 5) strength += 30;
    if (/[A-Z]/.test(password)) strength += 20;
    if (/[0-9]/.test(password)) strength += 20;
    if (/[^A-Za-z0-9]/.test(password)) strength += 30;
    return strength;
  }, [password]);

  const strengthBarColor = useMemo(() => {
    if (passwordStrength < 40) return "bg-red-500";
    if (passwordStrength < 70) return "bg-yellow-400";
    return "bg-green-500";
  }, [passwordStrength]);

  const displayAlert = (text, type) => {
    setAlert({ text, type });
    setShowAlert(true);

    window.setTimeout(() => {
      setShowAlert(false);
    }, 4000);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    if (!trimmedName || !trimmedEmail || !trimmedPassword || !termsAccepted) {
      displayAlert("Please fill all fields and accept terms!", "error");
      return;
    }

    if (!EMAIL_REGEX.test(trimmedEmail)) {
      displayAlert("Please enter a valid email address!", "error");
      return;
    }

    const user = {
      name: trimmedName,
      email: trimmedEmail,
      password: trimmedPassword,
    };
    window.localStorage.setItem("user", JSON.stringify(user));

    displayAlert("Signup successful!", "success");
    setName("");
    setEmail("");
    setPassword("");
    setTermsAccepted(false);
  };

  const alertClassByType = {
    success: "text-green-800 bg-green-50 dark:bg-gray-700 dark:text-green-400",
    error: "text-red-800 bg-red-50 dark:bg-gray-700 dark:text-red-400",
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white dark:bg-white dark:text-black">
        <nav className="bg-black/70 backdrop-blur-lg p-4 flex justify-between items-center border-b border-gray-700">
          <div className="flex items-center space-x-2">
            <img src={logo} className="h-8 w-8 object-contain" alt="AI Attendance Logo" />
            <h1 className="font-bold text-xl text-cyan-400">AI Attendance</h1>
          </div>

          <div className="space-x-6 hidden md:block">
            <Link to="/" className="hover:text-cyan-400">
              Home
            </Link>
            <Link to="/blog" className="hover:text-cyan-400">
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
          </div>

          <div className="space-x-4">
            <Link to="/signin" className="hover:text-cyan-400">
              Sign In
            </Link>
            <Link
              to="/signup"
              className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg"
            >
              Sign Up
            </Link>
            <Link to="/page-not-found" className="hover:text-cyan-400">
              PageNotFound
            </Link>
            <button
              id="themeToggle"
              type="button"
              className="px-3 py-1 bg-cyan-500 rounded"
              onClick={() => setTheme((current) => getNextTheme(current))}
            >
              Toggle
            </button>
          </div>
        </nav>

        <section className="text-center py-14 bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
          <h1 className="text-4xl font-bold text-cyan-400">Create Account</h1>
          <p className="text-gray-300">Join AI Attendance System</p>
        </section>

        <section className="max-w-md mx-auto bg-gray-900 text-white p-8 rounded-xl shadow-lg mt-10 dark:bg-gray-900 dark:text-white">
          <h2 className="text-2xl font-bold text-center text-purple-400 mb-6">
            Sign Up
          </h2>

          <div
            id="signupAlert"
            className={`${
              showAlert ? "block" : "hidden"
            } p-3 mb-4 rounded ${alertClassByType[alert.type] || ""}`}
          >
            {alert.text}
          </div>

          <form onSubmit={handleSubmit}>
            <input
              type="text"
              id="name"
              placeholder="Full Name"
              aria-label="Full Name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              className="w-full mb-4 p-2 rounded bg-black border border-gray-700 focus:ring-2 focus:ring-cyan-400 dark:bg-gray-800 dark:text-white"
            />

            <input
              type="email"
              id="email"
              placeholder="Email"
              aria-label="Email Address"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="w-full mb-4 p-2 rounded bg-black border border-gray-700 focus:ring-2 focus:ring-cyan-400 dark:bg-gray-800 dark:text-white"
            />

            <input
              type="password"
              id="password"
              placeholder="Password"
              aria-label="Password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="w-full mb-2 p-2 rounded bg-black border border-gray-700 focus:ring-2 focus:ring-cyan-400 dark:bg-gray-800 dark:text-white"
            />

            <div className="w-full bg-gray-700 h-2 rounded mb-4">
              <div
                id="strengthBar"
                className={`h-2 rounded transition-all ${strengthBarColor}`}
                style={{ width: `${passwordStrength}%` }}
              />
            </div>

            <div className="flex items-center mb-4">
              <input
                type="checkbox"
                id="terms"
                checked={termsAccepted}
                onChange={(event) => setTermsAccepted(event.target.checked)}
                className="mr-2"
              />
              <label htmlFor="terms">I agree to terms</label>
            </div>

            <button
              type="submit"
              className="w-full py-2 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg hover:scale-105 transition"
            >
              Sign Up
            </button>
          </form>

          <div className="mt-5 flex items-center justify-center gap-4">
            <button
              type="button"
              aria-label="Sign up with Google"
              className="group p-2 rounded-full bg-white/95 border border-gray-200 shadow transition duration-200 hover:bg-red-50 hover:border-red-300 hover:shadow-red-200/50 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-red-300"
            >
              <img
                src={googleIcon}
                alt="Google"
                className="h-6 w-6 object-contain transition duration-200 group-hover:brightness-110 group-hover:contrast-125"
              />
            </button>
            <button
              type="button"
              aria-label="Sign up with Facebook"
              className="group p-2 rounded-full bg-white/95 border border-gray-200 shadow transition duration-200 hover:bg-blue-50 hover:border-blue-300 hover:shadow-blue-200/50 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-300"
            >
              <img
                src={facebookIcon}
                alt="Facebook"
                className="h-6 w-6 object-contain transition duration-200 group-hover:brightness-110 group-hover:contrast-125"
              />
            </button>
          </div>

          <p className="mt-4 text-center">
            Already have account?{" "}
            <Link to="/signin" className="text-cyan-400">
              Sign In
            </Link>
          </p>
        </section>

        <footer className="bg-black text-white text-center p-5 mt-10 border-t border-gray-700 dark:bg-black dark:text-white">
          <p>© 2026 AI Attendance System</p>
        </footer>
    </div>
  );
}
