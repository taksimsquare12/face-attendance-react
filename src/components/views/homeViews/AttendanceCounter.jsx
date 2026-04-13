import { useState } from "react";

function AttendanceCounter() {
  const [counter, setCounter] = useState(0);

  const incrementCounter = () => {
    setCounter((previousCounter) => previousCounter + 1);
  };

  const decrementCounter = () => {
    setCounter((previousCounter) => previousCounter - 1);
  };

  const resetCounter = () => {
    setCounter(0);
  };

  return (
    <section className="p-10 bg-gray-900 dark:bg-gray-100 rounded-xl m-10">
      <h2 className="text-2xl font-bold mb-4 text-cyan-400">Attendance Action Counter</h2>
      <p className="mb-4">
        Track how many attendance operations are performed during a session.
      </p>
      <p className="text-lg mb-5">
        Current Count: <span className="font-bold">{counter}</span>
      </p>
      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          onClick={incrementCounter}
          className="px-4 py-2 rounded bg-green-600 hover:bg-green-700 text-white"
        >
          Increment
        </button>
        <button
          type="button"
          onClick={decrementCounter}
          className="px-4 py-2 rounded bg-yellow-600 hover:bg-yellow-700 text-white"
        >
          Decrement
        </button>
        <button
          type="button"
          onClick={resetCounter}
          className="px-4 py-2 rounded bg-red-600 hover:bg-red-700 text-white"
        >
          Reset
        </button>
      </div>
    </section>
  );
}

export default AttendanceCounter;
