import React, { useState } from 'react';
import StudentCard from './StudentCard';
import { Search } from 'lucide-react';

const StudentList = ({ students, onMarkAttendance }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredStudents = students.filter(student => 
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    student.rollNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="student-list-container">
      <div className="search-container">
        <Search className="search-icon" size={20} />
        <input 
          type="text" 
          placeholder="Search by student name or roll number..." 
          className="search-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      
      {filteredStudents.length > 0 ? (
        <div className="students-grid">
          {filteredStudents.map(student => (
            <StudentCard 
              key={student.id} 
              student={student} 
              onMarkAttendance={onMarkAttendance} 
            />
          ))}
        </div>
      ) : (
        <div className="no-results">
          <p>No students found matching your search.</p>
        </div>
      )}
    </div>
  );
};

export default StudentList;
