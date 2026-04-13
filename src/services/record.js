import { getStudents, setStudents } from "./student";

export function renderRecords() {
  return getStudents();
}

export function addRecord(name, status, time) {
  const students = getStudents();
  const newId = students.length ? students[students.length - 1].id + 1 : 1;

  const nextStudents = [...students, { id: newId, name, status, time }];
  setStudents(nextStudents);
  return nextStudents;
}

export function editRecord(id, newStatus) {
  const students = getStudents();
  const nextStudents = students.map((student) =>
    student.id === id ? { ...student, status: newStatus } : student
  );

  setStudents(nextStudents);
  return nextStudents;
}

export function deleteRecord(id) {
  const students = getStudents();
  const nextStudents = students.filter((student) => student.id !== id);

  setStudents(nextStudents);
  return nextStudents;
}
