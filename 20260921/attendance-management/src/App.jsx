import React, { useState } from 'react';
import Header from './components/Header';
import Summary from './components/Summary';
import StudentList from './components/StudentList';
import './App.css';

const initialStudents = [
  { id: 1, name: "Alice Johnson", rollNumber: "CSE001", branch: "CSE", totalClasses: 40, attendedClasses: 35, currentStatus: null },
  { id: 2, name: "Bob Smith", rollNumber: "CSE002", branch: "CSE", totalClasses: 40, attendedClasses: 28, currentStatus: null },
  { id: 3, name: "Charlie Brown", rollNumber: "ECE001", branch: "ECE", totalClasses: 40, attendedClasses: 38, currentStatus: null },
  { id: 4, name: "Diana Prince", rollNumber: "MEC001", branch: "MECH", totalClasses: 40, attendedClasses: 25, currentStatus: null },
  { id: 5, name: "Ethan Hunt", rollNumber: "MEC002", branch: "MECH", totalClasses: 40, attendedClasses: 30, currentStatus: null },
  { id: 6, name: "Fiona Gallagher", rollNumber: "CSE003", branch: "CSE", totalClasses: 40, attendedClasses: 10, currentStatus: null }
];

function App() {
  const [students, setStudents] = useState(initialStudents);

  const handleMarkAttendance = (studentId, status) => {
    setStudents(prevStudents => 
      prevStudents.map(student => {
        if (student.id === studentId) {
          let newTotal = student.totalClasses;
          let newAttended = student.attendedClasses;

          // Revert previous status if it was set
          if (student.currentStatus === 'present') {
            newTotal -= 1;
            newAttended -= 1;
          } else if (student.currentStatus === 'absent') {
            newTotal -= 1;
          }

          // Apply new status
          if (status === 'present') {
            newTotal += 1;
            newAttended += 1;
          } else if (status === 'absent') {
            newTotal += 1;
          }

          return {
            ...student,
            totalClasses: newTotal,
            attendedClasses: newAttended,
            currentStatus: status === 'reset' ? null : status
          };
        }
        return student;
      })
    );
  };

  const totalStudents = students.length;
  const presentCount = students.filter(s => s.currentStatus === 'present').length;
  const absentCount = students.filter(s => s.currentStatus === 'absent').length;

  return (
    <div className="app-container">
      <Header />
      <main className="main-content">
        <Summary 
          totalStudents={totalStudents} 
          presentCount={presentCount} 
          absentCount={absentCount} 
        />
        <StudentList 
          students={students} 
          onMarkAttendance={handleMarkAttendance} 
        />
      </main>
    </div>
  );
}

export default App;
