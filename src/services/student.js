const initialStudents = [
  { id: 1, name: "Umar", status: "Present", time: "9:00 AM" },
  { id: 2, name: "Fatima", status: "Absent", time: "-" },
  { id: 3, name: "Laiba", status: "Late", time: "9:20 AM" },
  { id: 4, name: "Ahmed", status: "Present", time: "9:05 AM" },
  { id: 5, name: "Sara", status: "Present", time: "9:10 AM" },
];

let students = [...initialStudents];

export function getStudents() {
  return [...students];
}

export function setStudents(nextStudents) {
  students = [...nextStudents];
  return getStudents();
}

export function resetStudents() {
  students = [...initialStudents];
  return getStudents();
}
