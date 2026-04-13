import { Link } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { applyTheme, getInitialTheme, getNextTheme } from "../constants/themeConstants";

const logo = "/favicon.svg";
const INITIAL_STUDENTS = [
  { id: 1, name: "Ahmad", status: "Present" },
  { id: 2, name: "Ali", status: "Late" },
  { id: 3, name: "Sara", status: "Absent" },
  { id: 4, name: "Urooj", status: "Present" },
];

const VALID_STATUSES = ["Present", "Absent", "Late"];

export default function RecordsPage() {
  const [students, setStudents] = useState(INITIAL_STUDENTS);
  const [newName, setNewName] = useState("");
  const [newStatus, setNewStatus] = useState("Present");
  const [searchQuery, setSearchQuery] = useState("");
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  const filteredStudents = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return students;
    return students.filter((student) =>
      student.name.toLowerCase().includes(query)
    );
  }, [students, searchQuery]);

  const handleAddStudent = (event) => {
    event.preventDefault();
    const trimmedName = newName.trim();
    if (!trimmedName) return;

    setStudents((prev) => [
      ...prev,
      { id: Date.now(), name: trimmedName, status: newStatus },
    ]);
    setNewName("");
    setNewStatus("Present");
  };

  const handleDeleteStudent = (id) => {
    setStudents((prev) => prev.filter((student) => student.id !== id));
  };

  const handleEditStudent = (id) => {
    const current = students.find((student) => student.id === id);
    if (!current) return;

    const input = window.prompt(
      "Update status (Present/Absent/Late):",
      current.status
    );
    if (!input) return;

    const normalized = input.trim();
    if (!VALID_STATUSES.includes(normalized)) {
      window.alert("Invalid status. Use Present, Absent, or Late.");
      return;
    }

    setStudents((prev) =>
      prev.map((student) =>
        student.id === id ? { ...student, status: normalized } : student
      )
    );
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
            <Link to="/records" className="text-cyan-400">
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
          <h1 className="text-4xl font-bold text-cyan-400">
            Student Attendance Records
          </h1>
          <p className="text-gray-300">CRUD Operations + Search + Loops</p>
        </section>

        <section className="max-w-3xl mx-auto bg-gray-900 text-white p-8 rounded-xl shadow-lg mt-10 dark:bg-gray-900 dark:text-white">
          <h2 className="text-2xl font-bold text-purple-400 mb-6">
            Add New Student
          </h2>

          <form onSubmit={handleAddStudent} className="flex gap-4 mb-6">
            <input
              id="newName"
              aria-label="Student Name"
              placeholder="Student Name"
              value={newName}
              onChange={(event) => setNewName(event.target.value)}
              className="flex-1 p-2 rounded bg-black border border-gray-700 text-white dark:bg-black dark:text-white"
            />
            <select
              id="newStatus"
              aria-label="Status"
              value={newStatus}
              onChange={(event) => setNewStatus(event.target.value)}
              className="p-2 rounded bg-black border border-gray-700 text-white dark:bg-black dark:text-white"
            >
              <option>Present</option>
              <option>Absent</option>
              <option>Late</option>
            </select>
            <button
              type="submit"
              className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg"
            >
              Add
            </button>
          </form>

          <div className="mb-6">
            <input
              id="searchBox"
              aria-label="Search Students"
              placeholder="Search by name..."
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              className="w-full p-2 rounded bg-black border border-gray-700 text-white dark:bg-black dark:text-white"
            />
          </div>

          <div id="studentGrid" className="grid md:grid-cols-3 gap-6">
            {filteredStudents.map((student) => (
              <div
                key={student.id}
                className="bg-gray-900 text-white p-4 rounded shadow-lg dark:bg-gray-900 dark:text-white"
              >
                <h3 className="text-cyan-400 font-bold">{student.name}</h3>
                <p>Status: {student.status}</p>
                <div className="mt-2 flex gap-2">
                  <button
                    type="button"
                    onClick={() => handleEditStudent(student.id)}
                    className="px-2 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDeleteStudent(student.id)}
                    className="px-2 py-1 bg-red-500 hover:bg-red-600 text-white rounded"
                  >
                    Delete
                  </button>
                </div>
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
