import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/images/logo.png";
import classroomImage from "../assets/images/classroom.jpg";
import faceScanImage from "../assets/images/facescan.jpg";
import aiAttendanceImage from "../assets/images/ai-attendance.jpg";
import { applyTheme, getInitialTheme, getNextTheme } from "../constants/themeConstants";
import AttendanceCounter from "../components/views/homeViews/AttendanceCounter";

const projectName = "AI Face Attendance System";
const totalStudents = 50;

const initialStudents = [
  { id: 1, name: "Ahmad", status: "Present", time: "9:00 AM" },
  { id: 2, name: "Ali", status: "Late", time: "9:15 AM" },
  { id: 3, name: "Sara", status: "Absent", time: "-" },
  { id: 4, name: "Urooj", status: "Present", time: "9:05 AM" },
];

const features = [
  {
    title: "Spoof Detection",
    titleClass: "text-cyan-400",
    body: "Prevent fake attendance using AI liveness detection.",
  },
  {
    title: "Cloud Dashboard",
    titleClass: "text-purple-400",
    body: "Monitor attendance in real-time anywhere.",
  },
  {
    title: "Real-Time Tracking",
    titleClass: "text-pink-400",
    body: "Track student presence continuously.",
  },
];

const stats = [
  { value: "50+", label: "Students", color: "text-cyan-400" },
  { value: "95%", label: "Accuracy", color: "text-purple-400" },
  { value: "24/7", label: "Active", color: "text-pink-400" },
  { value: "100%", label: "Secure", color: "text-green-400" },
];

function buildObjectCrudDemo() {
  const studentProfile = { name: "Urooj", section: "CS-A", status: "Present" };
  studentProfile.department = "Computer Science";
  const readValue = studentProfile.name;
  studentProfile.status = "Late";
  delete studentProfile.section;
  return { readValue, studentProfile };
}

function HomePage() {
  const [theme, setTheme] = useState(getInitialTheme);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [students, setStudents] = useState(initialStudents);
  const [systemActive, setSystemActive] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterOption, setFilterOption] = useState("all");
  const [summaryText, setSummaryText] = useState("");
  const objectCrud = useMemo(() => buildObjectCrudDemo(), []);

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  useEffect(() => {
    const rawName = "   Ahmad Ali   ";
    console.log(rawName.trim().toUpperCase());
    console.log(rawName.includes("Ali"));
    console.log(rawName.replace("Ali", "Khan"));
    console.log(rawName.slice(0, 5));
    console.log(rawName.startsWith("Ah"));
    console.log(rawName.endsWith("li"));
    console.log(rawName.split(" "));
    console.log(rawName.concat(" - Student"));
  }, []);

  const displayedStudents = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (q) {
      return students.filter((s) => s.name.toLowerCase().includes(q));
    }
    switch (filterOption) {
      case "present":
        return students.filter((s) => s.status.toLowerCase() === "present");
      case "absent":
        return students.filter((s) => s.status.toLowerCase() === "absent");
      case "late":
        return students.filter((s) => s.status.toLowerCase() === "late");
      case "recent":
        return students.slice(-3);
      case "all":
      case "sortName":
      case "sortTime":
      default:
        return students;
    }
  }, [students, searchQuery, filterOption]);

  const showSummary = () => {
    const registeredCount = students.length;
    const percentageRegistered = ((registeredCount / totalStudents) * 100).toFixed(1);
    const latest = students[students.length - 1];
    setSummaryText(
      [
        "System Summary:",
        `Project: ${projectName}`,
        `Status: ${systemActive ? "✅ Active" : "❌ Inactive"}`,
        `Registered Students: ${registeredCount} (${percentageRegistered}%)`,
        `Latest Record: ${latest ? `${latest.name} (${latest.status} at ${latest.time})` : "—"}`,
        "AI Detection Mode: Smart Recognition Enabled 🤖",
        "System Health: Running smoothly with secure AI verification",
      ].join("\n")
    );
  };

  const handleFilterChange = (e) => {
    const v = e.target.value;
    setFilterOption(v);
    if (v === "sortName") {
      setStudents((s) => [...s].sort((a, b) => a.name.localeCompare(b.name)));
    } else if (v === "sortTime") {
      setStudents((s) =>
        [...s].sort(
          (a, b) =>
            new Date(`1970/01/01 ${a.time}`) - new Date(`1970/01/01 ${b.time}`)
        )
      );
    }
  };

  const editStudent = (id) => {
    const student = students.find((s) => s.id === id);
    if (!student) return;
    const next = window.prompt("Update status:", student.status);
    if (next === null) return;
    setStudents((list) =>
      list.map((s) => (s.id === id ? { ...s, status: next || s.status } : s))
    );
  };

  const deleteStudent = (id) => {
    setStudents((list) => list.filter((s) => s.id !== id));
  };

  const first = students[0];

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
          <Link to="/" className="text-cyan-400">
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

      <section className="text-center py-20 bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
        <h1 className="text-5xl md:text-6xl font-bold text-cyan-400 mb-4">AI Face Attendance System</h1>
        <p className="text-lg text-gray-300 dark:text-gray-600 mb-6">
          Automated Present • Absent • Late Detection
        </p>
        <button
          type="button"
          onClick={showSummary}
          className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg shadow-lg hover:scale-110 transition text-white"
        >
          Run AI System
        </button>
      </section>

      <section className="grid md:grid-cols-3 gap-8 p-10">
        {features.map((f) => (
          <article
            key={f.title}
            className="bg-gray-900 dark:bg-gray-100 p-6 rounded-xl hover:scale-105 transition shadow-lg"
          >
            <h2 className={`text-xl font-bold ${f.titleClass}`}>{f.title}</h2>
            <p className="text-gray-400 dark:text-gray-600 mt-2">{f.body}</p>
          </article>
        ))}
      </section>

      <section className="px-6 pb-10 md:px-10">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <img
            src={classroomImage}
            alt="Classroom attendance setup"
            className="w-full h-56 md:h-64 object-cover rounded-xl shadow-lg"
          />
          <img
            src={faceScanImage}
            alt="Face scan attendance process"
            className="w-full h-56 md:h-64 object-cover rounded-xl shadow-lg"
          />
          <img
            src={aiAttendanceImage}
            alt="AI attendance system dashboard"
            className="w-full h-56 md:h-64 object-cover rounded-xl shadow-lg"
          />
        </div>
      </section>

      <section className="p-10 text-center flex flex-wrap items-center justify-center gap-3">
        <input
          id="searchInput"
          type="text"
          placeholder="Search student..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="p-2 bg-black dark:bg-white border border-gray-600 dark:border-gray-300 rounded text-white dark:text-black placeholder:text-gray-500 min-w-[200px]"
        />
        <select
          id="filterOptions"
          value={filterOption}
          onChange={handleFilterChange}
          className="p-2 bg-black dark:bg-white border border-gray-600 dark:border-gray-300 rounded text-white dark:text-black"
        >
          <option value="all">All Students</option>
          <option value="present">Present</option>
          <option value="absent">Absent</option>
          <option value="late">Late</option>
          <option value="sortName">Sort by Name</option>
          <option value="sortTime">Sort by Time</option>
          <option value="recent">Show Recently Added</option>
        </select>
      </section>

      <section className="grid md:grid-cols-3 gap-6 p-10">
        {displayedStudents.map((student) => (
          <div key={student.id} className="bg-gray-900 dark:bg-gray-100 p-6 rounded-xl shadow-lg">
            <h3 className="text-xl font-bold text-cyan-400">{student.name.trim().toUpperCase()}</h3>
            <p>Status: {student.status}</p>
            <p>Time: {student.time}</p>
            <button
              type="button"
              className="bg-purple-500 px-3 py-1 rounded mt-2 mr-2 text-white"
              onClick={() => editStudent(student.id)}
            >
              Edit
            </button>
            <button
              type="button"
              className="bg-red-500 px-3 py-1 rounded mt-2 text-white"
              onClick={() => deleteStudent(student.id)}
            >
              Delete
            </button>
          </div>
        ))}
      </section>

      <section className="p-10 bg-gray-900 dark:bg-gray-100 rounded-xl m-10">
        <h2 className="text-2xl font-bold mb-4 text-purple-400">Object CRUD Demo</h2>
        <div className="p-4 bg-black dark:bg-white rounded text-white dark:text-black">
          <p>
            <b>Name:</b> {objectCrud.readValue}
          </p>
          <p>
            <b>Status:</b> {objectCrud.studentProfile.status}
          </p>
          <p>
            <b>Department:</b> {objectCrud.studentProfile.department}
          </p>
          <p>
            <b>Section:</b> {objectCrud.studentProfile.section || "Deleted"}
          </p>
        </div>
      </section>

      <section className="p-10 bg-gray-900 dark:bg-gray-100 rounded-xl m-10">
        <h2 className="text-2xl font-bold mb-4 text-purple-400">System Data</h2>
        <p>
          Project: <span>{projectName}</span>
        </p>
        <p>
          Total Students: <span>{totalStudents}</span>
        </p>
        <p>
          Status: <span>{systemActive ? "Yes" : "No"}</span>
        </p>
        <p>
          List: <span>{students.map((s) => s.name).join(", ")}</span>
        </p>
        <p>
          Record:{" "}
          <span>
            {first
              ? `${first.name} - ${first.status} at ${first.time}`
              : "—"}
          </span>
        </p>
        <button
          type="button"
          onClick={showSummary}
          className="mt-4 px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded text-white"
        >
          Show Summary
        </button>
        <div
          role="presentation"
          onDoubleClick={() => setSystemActive((a) => !a)}
          className="mt-4 p-4 bg-black dark:bg-white rounded text-white dark:text-black whitespace-pre-wrap cursor-default select-none"
        >
          {summaryText}
        </div>
      </section>

      <AttendanceCounter />

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

      <footer className="bg-black text-white text-center p-5 mt-10 border-t border-gray-700 dark:bg-black dark:text-white">
        <p>© 2026 AI Attendance System</p>
      </footer>
    </div>
  );
}

export default HomePage;
