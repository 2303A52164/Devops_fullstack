import React from 'react';
import { EyeIcon, EditIcon, TrashIcon } from './Icons';

const StudentCard = ({ student, onView, onEdit, onDelete }) => {
  const getBranchBadgeClass = (branch) => {
    switch (branch?.toUpperCase()) {
      case 'CSE':
        return 'badge-cse';
      case 'ECE':
        return 'badge-ece';
      case 'MECH':
        return 'badge-mech';
      case 'CIVIL':
        return 'badge-civil';
      case 'IT':
        return 'badge-it';
      default:
        return 'badge-default';
    }
  };

  const getInitials = (name) => {
    if (!name) return 'ST';
    const parts = name.trim().split(' ');
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  };

  return (
    <div className="student-card">
      <div className="card-top-row">
        <div className="avatar-circle">
          {getInitials(student.name)}
        </div>
        <span className={`branch-badge ${getBranchBadgeClass(student.branch)}`}>
          {student.branch}
        </span>
      </div>

      <div className="card-body">
        <h3 className="card-student-name" title={student.name}>
          {student.name}
        </h3>
        <div className="card-roll-no">
          <span className="roll-label">Roll No:</span>
          <span className="roll-value">{student.rollNo}</span>
        </div>

        {student.email && (
          <p className="card-email" title={student.email}>
            {student.email}
          </p>
        )}

        {student.semester && (
          <div className="card-sub-info">
            <span className="info-chip">{student.semester}</span>
            {student.cgpa && (
              <span className="info-chip cgpa-chip">CGPA: {student.cgpa}</span>
            )}
          </div>
        )}
      </div>

      <div className="card-actions">
        <button
          type="button"
          className="card-action-btn view-btn"
          onClick={() => onView(student)}
          title="View Student Details"
        >
          <EyeIcon size={14} />
          <span>Details</span>
        </button>
        <button
          type="button"
          className="card-action-btn edit-btn"
          onClick={() => onEdit(student)}
          title="Edit Student"
        >
          <EditIcon size={14} />
          <span>Edit</span>
        </button>
        <button
          type="button"
          className="card-action-btn delete-btn"
          onClick={() => onDelete(student)}
          title="Delete Student"
        >
          <TrashIcon size={14} />
          <span>Delete</span>
        </button>
      </div>
    </div>
  );
};

export default StudentCard;
