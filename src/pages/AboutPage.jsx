import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/images/logo.png";
import { applyTheme, getInitialTheme, getNextTheme } from "../constants/themeConstants";

const projectInfo = {
  name: "AI Face Attendance System",
  year: 2026,
  active: true,
  team: ["Urooj", "Dr. Ahmed"],
};

const demoString = "AI Attendance System";
const stringResults = [
  `toUpperCase(): "${demoString.toUpperCase()}"`,
  `length: ${demoString.length}`,
  `includes("Attendance"): ${demoString.includes("Attendance")}`,
  `slice(0, 2): "${demoString.slice(0, 2)}"`,
  `replace("System", "Platform"): "${demoString.replace("System", "Platform")}"`,
  `split(" "): [${demoString.split(" ").map((s) => `"${s}"`).join(", ")}]`,
];

const features = [
  {
    id: "face",
    title: "Face Recognition",
    titleClass: "text-cyan-400",
    body: "Accurate identification of students using AI.",
  },
  {
    id: "spoof",
    title: "Spoof Detection",
    titleClass: "text-purple-400",
    body: "Prevents fake attendance using liveness checks.",
  },
  {
    id: "realtime",
    title: "Real-Time Tracking",
    titleClass: "text-pink-400",
    body: "Monitor presence continuously.",
  },
];

const timeline = [
  { dot: "bg-cyan-400", title: "Idea Phase", text: "Concept designed in 2026." },
  { dot: "bg-purple-400", title: "Development", text: "Built using HTML, Tailwind, and JS." },
  { dot: "bg-pink-400", title: "Testing", text: "Validated for accuracy and security.", last: true },
];

const faqs = [
  {
    q: "What is this system?",
    a: "AI-based attendance system using face recognition.",
  },
  {
    q: "Is it secure?",
    a: "Yes, spoof detection prevents fake attendance.",
  },
];

const stats = [
  { value: "50+", label: "Students", color: "text-cyan-400" },
  { value: "95%", label: "Accuracy", color: "text-purple-400" },
  { value: "24/7", label: "Monitoring", color: "text-pink-400" },
  { value: "100%", label: "Secure", color: "text-green-400" },
];

function AboutPage() {
  const [theme, setTheme] = useState(getInitialTheme);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [featureVisible, setFeatureVisible] = useState([false, false, false]);
  const [highlighted, setHighlighted] = useState(() => ({
    face: false,
    spoof: false,
    realtime: false,
  }));

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  useEffect(() => {
    const timers = features.map((_, index) =>
      window.setTimeout(() => {
        setFeatureVisible((prev) => {
          const next = [...prev];
          next[index] = true;
          return next;
        });
      }, index * 300)
    );
    return () => timers.forEach(clearTimeout);
  }, []);

  useEffect(() => {
    console.log("About Page Loaded:", projectInfo);
  }, []);

  const toggleFeatureHighlight = (id) => {
    setHighlighted((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white dark:bg-white dark:text-black">
      <header className="bg-black/70 backdrop-blur-lg p-4 flex flex-wrap justify-between items-center gap-4 border-b border-gray-700">
        <div className="flex items-center gap-2">
          <img src={logo} alt="AI Attendance" className="h-8 w-8" />
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
          <Link to="/about" className="text-cyan-400">
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

      <main>
        <section className="text-center py-20 bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
          <h1 className="text-4xl md:text-5xl font-bold text-cyan-400 mb-4">
            About AI Attendance System
          </h1>
          <p className="max-w-2xl mx-auto text-gray-300 dark:text-gray-600">
            Our AI-powered face recognition system automates attendance using smart detection, spoof
            prevention, and real-time monitoring to ensure security and efficiency.
          </p>
        </section>

        <section className="grid md:grid-cols-3 gap-8 p-10">
          {features.map((f, index) => {
            const visible = featureVisible[index];
            const on = highlighted[f.id];
            return (
              <div
                key={f.id}
                role="button"
                tabIndex={0}
                onClick={() => toggleFeatureHighlight(f.id)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    toggleFeatureHighlight(f.id);
                  }
                }}
                className={`p-6 rounded-xl hover:scale-105 transition cursor-pointer ${
                  on ? "bg-cyan-500 text-white" : "bg-gray-900 dark:bg-gray-100"
                }`}
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateY(0)" : "translateY(30px)",
                  transition: "opacity 0.6s ease, transform 0.6s ease",
                }}
              >
                <h3 className={`font-bold ${on ? "text-white" : f.titleClass}`}>{f.title}</h3>
                <p className={`mt-2 ${on ? "text-white/90" : "text-gray-400 dark:text-gray-600"}`}>
                  {f.body}
                </p>
              </div>
            );
          })}
        </section>

        <section className="p-10">
          <h2 className="text-2xl font-bold mb-6 text-purple-400">Project Timeline</h2>
          <ol className="relative border-l border-gray-700 dark:border-gray-300">
            {timeline.map((item) => (
              <li key={item.title} className={item.last ? "ml-6" : "mb-10 ml-6"}>
                <span
                  className={`absolute w-3 h-3 rounded-full -left-1.5 ${item.dot}`}
                  aria-hidden
                />
                <h3 className="font-semibold">{item.title}</h3>
                <p className="text-gray-400 dark:text-gray-600">{item.text}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="p-10">
          <h2 className="text-2xl font-bold mb-4 text-cyan-400">FAQs</h2>
          {faqs.map((item, i) => (
            <details
              key={item.q}
              className={`bg-gray-900 dark:bg-gray-100 p-4 rounded ${i === 0 ? "mb-2" : ""}`}
            >
              <summary className="cursor-pointer font-bold">{item.q}</summary>
              <p className="mt-2 text-gray-400 dark:text-gray-600">{item.a}</p>
            </details>
          ))}
        </section>

        <section className="p-10 text-center">
          <div className="grid md:grid-cols-4 gap-6">
            {stats.map((s) => (
              <div key={s.label} className="bg-gray-900 dark:bg-gray-100 p-6 rounded-xl">
                <p className={`text-3xl ${s.color}`}>{s.value}</p>
                <p>{s.label}</p>
              </div>
            ))}
          </div>
        </section>

        <div className="px-10 pb-6">
          <div className="mt-6 p-4 bg-gradient-to-r from-cyan-500 to-purple-500 text-white rounded shadow-lg">
            <h3 className="font-bold text-lg">Project Details</h3>
            <p>
              <strong>Name:</strong> {projectInfo.name.toUpperCase()}
            </p>
            <p>
              <strong>Year:</strong> {projectInfo.year}
            </p>
            <p>
              <strong>Status:</strong> {projectInfo.active ? "Active ✅" : "Inactive ❌"}
            </p>
            <p>
              <strong>Team:</strong> {projectInfo.team.join(", ")}
            </p>
          </div>

          <div className="mt-6 p-4 bg-gray-700 dark:bg-gray-200 text-white dark:text-black rounded">
            <h3 className="font-bold text-lg">String Methods Demo</h3>
            <ul className="list-disc ml-6 mt-2 space-y-1">
              {stringResults.map((res) => (
                <li key={res}>{res}</li>
              ))}
            </ul>
          </div>
        </div>
      </main>

      <footer className="bg-black text-white text-center p-5 mt-10 border-t border-gray-700 dark:bg-black dark:text-white">
        <p>© 2026 AI Attendance System</p>
      </footer>
    </div>
  );
}

export default AboutPage;
