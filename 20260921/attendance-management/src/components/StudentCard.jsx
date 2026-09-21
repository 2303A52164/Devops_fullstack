import React from 'react';
import Attendance from './Attendance';
import { User } from 'lucide-react';

const StudentCard = ({ student, onMarkAttendance }) => {
  const percentage = student.totalClasses === 0 ? 0 : Math.round((student.attendedClasses / student.totalClasses) * 100);
  const isLowAttendance = percentage < 75;

  return (
    <div className={`student-card ${isLowAttendance ? 'highlight-danger' : ''}`}>
      <div className="student-header">
        <div className="student-avatar">
          <User size={24} />
        </div>
        <div className="student-info">
          <h2>{student.name}</h2>
          <p className="student-details">
            <span className="roll-number">{student.rollNumber}</span>
            <span className="dot-separator">•</span>
            <span className="branch">{student.branch}</span>
          </p>
        </div>
      </div>
      
      <Attendance 
        id={student.id}
        totalClasses={student.totalClasses}
        attendedClasses={student.attendedClasses}
        currentStatus={student.currentStatus}
        onMarkAttendance={onMarkAttendance}
      />
    </div>
  );
};

export default StudentCard;
