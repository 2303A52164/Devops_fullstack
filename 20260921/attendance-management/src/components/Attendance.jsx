import React from 'react';

const Attendance = ({ id, totalClasses, attendedClasses, currentStatus, onMarkAttendance }) => {
  const percentage = totalClasses === 0 ? 0 : Math.round((attendedClasses / totalClasses) * 100);
  const isEligible = percentage >= 75;

  return (
    <div className="attendance-section">
      <div className="attendance-stats">
        <div className="stat-item">
          <span className="stat-label">Classes:</span>
          <span className="stat-value">{attendedClasses} / {totalClasses}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Percentage:</span>
          <span className={`stat-value ${percentage < 75 ? 'danger-text' : 'success-text'}`}>
            {percentage}%
          </span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Status:</span>
          <span className={`eligibility-badge ${isEligible ? 'eligible' : 'not-eligible'}`}>
            {isEligible ? 'Eligible' : 'Not Eligible'}
          </span>
        </div>
      </div>
      
      <div className="attendance-actions">
        <button 
          className={`btn btn-present ${currentStatus === 'present' ? 'active' : ''}`}
          onClick={() => onMarkAttendance(id, 'present')}
        >
          Present
        </button>
        <button 
          className={`btn btn-absent ${currentStatus === 'absent' ? 'active' : ''}`}
          onClick={() => onMarkAttendance(id, 'absent')}
        >
          Absent
        </button>
        <button 
          className="btn btn-reset"
          onClick={() => onMarkAttendance(id, 'reset')}
          disabled={!currentStatus}
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default Attendance;
