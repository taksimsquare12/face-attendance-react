import { Link } from "react-router-dom";

export default function PageNotFound() {
  return (
    <main className="min-h-[70vh] bg-gray-950 text-white flex items-center justify-center px-6">
      <section className="w-full max-w-xl text-center bg-gray-900 border border-gray-800 rounded-2xl p-8 shadow-lg">
        <p className="text-cyan-400 font-semibold tracking-wide">Error 404</p>
        <h1 className="mt-2 text-4xl md:text-5xl font-bold">Page Not Found</h1>
        <p className="mt-4 text-gray-300">
          The page you are looking for does not exist or may have been moved.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/"
            className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-cyan-500 to-purple-500 hover:opacity-90 transition"
          >
            Back to Home
          </Link>
          <Link
            to="/records"
            className="px-5 py-2.5 rounded-lg border border-gray-600 hover:border-cyan-400 hover:text-cyan-400 transition"
          >
            Go to Records
          </Link>
        </div>
      </section>
    </main>
  );
}
