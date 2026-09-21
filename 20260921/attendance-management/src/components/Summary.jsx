import React from 'react';
import { Users, CheckCircle, XCircle } from 'lucide-react';

const Summary = ({ totalStudents, presentCount, absentCount }) => {
  return (
    <div className="summary-container">
      <div className="summary-card total">
        <Users size={24} />
        <div className="summary-info">
          <h3>Total Students</h3>
          <p>{totalStudents}</p>
        </div>
      </div>
      <div className="summary-card present">
        <CheckCircle size={24} />
        <div className="summary-info">
          <h3>Present Today</h3>
          <p>{presentCount}</p>
        </div>
      </div>
      <div className="summary-card absent">
        <XCircle size={24} />
        <div className="summary-info">
          <h3>Absent Today</h3>
          <p>{absentCount}</p>
        </div>
      </div>
    </div>
  );
};

export default Summary;
