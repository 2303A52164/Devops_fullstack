import React, { useEffect } from 'react';
import { CloseIcon, EditIcon, TrashIcon, GraduationCapIcon } from './Icons';

const StudentDetails = ({ student, onClose, onEdit, onDelete }) => {
  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!student) return null;

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
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-header-brand">
            <div className="modal-avatar">
              {getInitials(student.name)}
            </div>
            <div>
              <span className="modal-overline">STUDENT RECORD DOSSIER</span>
              <h2 className="modal-title">{student.name}</h2>
            </div>
          </div>
          <button
            type="button"
            className="modal-close-btn"
            onClick={onClose}
            title="Close Details Modal"
          >
            <CloseIcon size={20} />
          </button>
        </div>

        <div className="modal-body">
          <div className="details-banner">
            <div className="banner-item">
              <span className="banner-label">Roll Number</span>
              <span className="banner-value font-mono">{student.rollNo}</span>
            </div>
            <div className="banner-item">
              <span className="banner-label">Branch</span>
              <span className={`branch-badge ${getBranchBadgeClass(student.branch)}`}>
                {student.branch}
              </span>
            </div>
            <div className="banner-item">
              <span className="banner-label">Academic Status</span>
              <span className="status-badge-active">Enrolled / Active</span>
            </div>
          </div>

          <div className="details-grid">
            <div className="detail-field">
              <span className="detail-key">Database ID</span>
              <span className="detail-val font-mono">#{student.id}</span>
            </div>

            <div className="detail-field">
              <span className="detail-key">Official Full Name</span>
              <span className="detail-val">{student.name}</span>
            </div>

            <div className="detail-field">
              <span className="detail-key">College Email</span>
              <span className="detail-val">
                <a href={`mailto:${student.email}`} className="email-link">
                  {student.email || `${student.rollNo?.toLowerCase()}@college.edu`}
                </a>
              </span>
            </div>

            <div className="detail-field">
              <span className="detail-key">Current Semester</span>
              <span className="detail-val">{student.semester || '6th Semester'}</span>
            </div>

            <div className="detail-field">
              <span className="detail-key">Cumulative GPA (CGPA)</span>
              <span className="detail-val font-semibold text-emerald">
                {student.cgpa || '8.5 / 10.0'}
              </span>
            </div>

            <div className="detail-field">
              <span className="detail-key">Department</span>
              <span className="detail-val">
                Department of {student.branch === 'CSE' ? 'Computer Science & Engineering' : student.branch}
              </span>
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <div className="footer-left">
            <button
              type="button"
              className="btn-danger-outline"
              onClick={() => {
                onClose();
                onDelete(student);
              }}
            >
              <TrashIcon size={15} />
              <span>Delete Student</span>
            </button>
          </div>

          <div className="footer-right">
            <button
              type="button"
              className="btn-secondary"
              onClick={onClose}
            >
              Close
            </button>
            <button
              type="button"
              className="btn-primary"
              onClick={() => {
                onClose();
                onEdit(student);
              }}
            >
              <EditIcon size={15} />
              <span>Edit Student</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDetails;
