import { Link } from "react-router-dom";
import { useMemo, useState } from "react";
import logo from "../asserts/images/logo.png";
import googleIcon from "../asserts/images/google.png";
import facebookIcon from "../asserts/images/facebook.png";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function SigninPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });
  const [isMessageVisible, setIsMessageVisible] = useState(false);

  const emailValid = useMemo(() => email.includes("@"), [email]);
  const passwordValid = useMemo(() => password.length >= 6, [password]);

  const getInputValidationClass = (value, isValid) => {
    if (!value) return "";
    return isValid ? "border-green-500" : "border-red-500";
  };

  const showMessageBox = (text, type) => {
    setMessage({ text, type });
    setIsMessageVisible(true);

    window.setTimeout(() => {
      setIsMessageVisible(false);
    }, 4000);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    if (!EMAIL_REGEX.test(trimmedEmail)) {
      showMessageBox("Enter valid email", "error");
      return;
    }

    if (trimmedPassword.length < 6) {
      showMessageBox("Password must be at least 6 characters", "error");
      return;
    }

    showMessageBox("Verifying credentials...", "info");

    window.setTimeout(() => {
      showMessageBox("Login successful!", "success");
      setEmail("");
      setPassword("");
      setRememberMe(false);
      setShowPassword(false);
    }, 1500);
  };

  const messageClassByType = {
    success: "text-green-800 bg-green-50 dark:bg-gray-700 dark:text-green-400",
    error: "text-red-800 bg-red-50 dark:bg-gray-700 dark:text-red-400",
    info: "text-blue-800 bg-blue-50 dark:bg-gray-700 dark:text-blue-400",
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white dark:bg-white dark:text-black">
        <section className="text-center py-14 bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
          <div className="mb-3 flex flex-col items-center gap-2">
            <img src={logo} className="h-12 w-12 object-contain" alt="" width={48} height={48} />
            <p className="font-bold text-cyan-400">AI Attendance</p>
          </div>
          <h1 className="text-4xl font-bold text-cyan-400">Welcome Back</h1>
          <p className="text-gray-300">Login to AI Attendance System</p>
        </section>

        <section className="max-w-md mx-auto bg-gray-900 text-white p-8 rounded-xl shadow-lg mt-10 dark:bg-gray-900 dark:text-white">
          <h2 className="text-2xl font-bold text-center text-purple-400 mb-6">
            Sign In
          </h2>

          <div
            id="loginMessage"
            className={`${
              isMessageVisible ? "block" : "hidden"
            } p-3 mb-4 rounded text-sm ${messageClassByType[message.type] || ""}`}
          >
            {message.text}
          </div>

          <form onSubmit={handleSubmit}>
            <input
              type="email"
              id="email"
              placeholder="Email"
              aria-label="Email Address"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className={`w-full mb-4 p-2 rounded bg-black border border-gray-700 focus:ring-2 focus:ring-cyan-400 dark:bg-gray-800 dark:text-white ${getInputValidationClass(
                email,
                emailValid
              )}`}
            />

            <div className="relative mb-4">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="Password"
                aria-label="Password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className={`w-full p-2 rounded bg-black border border-gray-700 focus:ring-2 focus:ring-cyan-400 dark:bg-gray-800 dark:text-white ${getInputValidationClass(
                  password,
                  passwordValid
                )}`}
              />
              <button
                type="button"
                id="togglePassword"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-2 top-2 text-sm text-gray-400"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>

            <div className="flex items-center mb-4">
              <input
                type="checkbox"
                id="remember"
                checked={rememberMe}
                onChange={(event) => setRememberMe(event.target.checked)}
                className="mr-2"
              />
              <label htmlFor="remember">Remember Me</label>
            </div>

            <button
              type="submit"
              className="w-full py-2 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg hover:scale-105 transition"
            >
              Login
            </button>
          </form>

          <div className="mt-5 flex items-center justify-center gap-4">
            <button
              type="button"
              aria-label="Sign in with Google"
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
              aria-label="Sign in with Facebook"
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
            Don&apos;t have account?{" "}
            <Link to="/signup" className="text-cyan-400">
              Sign Up
            </Link>
          </p>
        </section>

        <footer className="bg-black text-white text-center p-5 mt-10 border-t border-gray-700 dark:bg-black dark:text-white">
          <p>© 2026 AI Attendance System</p>
        </footer>
    </div>
  );
}
