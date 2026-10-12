import React from 'react';
import StudentCard from './StudentCard';
import { EyeIcon, EditIcon, TrashIcon, TableIcon, GridIcon } from './Icons';

const StudentList = ({
  students,
  viewMode,
  setViewMode,
  onViewStudent,
  onEditStudent,
  onDeleteStudent
}) => {
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

  return (
    <div className="student-list-container">
      <div className="list-header-row">
        <div className="list-title-wrap">
          <h2 className="list-title">Student Directory</h2>
          <span className="list-counter-tag">
            {students.length} {students.length === 1 ? 'Record' : 'Records'}
          </span>
        </div>

        {/* View mode toggle: Table or Card Grid */}
        <div className="view-mode-toggle" role="group" aria-label="View format">
          <button
            type="button"
            className={`toggle-btn ${viewMode === 'table' ? 'active' : ''}`}
            onClick={() => setViewMode('table')}
            title="Table View (Assignment Format)"
          >
            <TableIcon size={16} />
            <span>Table View</span>
          </button>
          <button
            type="button"
            className={`toggle-btn ${viewMode === 'grid' ? 'active' : ''}`}
            onClick={() => setViewMode('grid')}
            title="Card Grid View"
          >
            <GridIcon size={16} />
            <span>Card View</span>
          </button>
        </div>
      </div>

      {students.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon-wrap">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="12" cy="12" r="10" />
              <path d="M8 12h8" />
            </svg>
          </div>
          <h3 className="empty-title">No Students Found</h3>
          <p className="empty-description">
            No student records match the active criteria or the list is currently empty.
          </p>
        </div>
      ) : viewMode === 'table' ? (
        /* Table View strictly fulfilling the assignment requirement */
        <div className="table-responsive">
          <table className="student-table">
            <thead>
              <tr>
                <th className="th-roll">Roll No</th>
                <th className="th-name">Name</th>
                <th className="th-branch">Branch</th>
                <th className="th-actions text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student.id} className="student-row">
                  <td className="td-roll">
                    <span className="roll-chip">{student.rollNo}</span>
                  </td>
                  <td className="td-name">
                    <div className="student-name-cell">
                      <div className="avatar-mini">
                        {student.name ? student.name.charAt(0).toUpperCase() : 'S'}
                      </div>
                      <div className="name-details">
                        <span className="primary-name">{student.name}</span>
                        {student.email && (
                          <span className="secondary-email">{student.email}</span>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="td-branch">
                    <span className={`branch-badge ${getBranchBadgeClass(student.branch)}`}>
                      {student.branch}
                    </span>
                  </td>
                  <td className="td-actions text-right">
                    <div className="actions-button-group">
                      <button
                        type="button"
                        className="action-btn btn-view"
                        onClick={() => onViewStudent(student)}
                        title="View Full Details"
                      >
                        <EyeIcon size={15} />
                        <span className="btn-text">View</span>
                      </button>

                      <button
                        type="button"
                        className="action-btn btn-edit"
                        onClick={() => onEditStudent(student)}
                        title="Update Student"
                      >
                        <EditIcon size={15} />
                        <span className="btn-text">Edit</span>
                      </button>

                      <button
                        type="button"
                        className="action-btn btn-delete"
                        onClick={() => onDeleteStudent(student)}
                        title="Delete Student Record"
                      >
                        <TrashIcon size={15} />
                        <span className="btn-text">Delete</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        /* Card Grid View using the StudentCard component */
        <div className="student-cards-grid">
          {students.map((student) => (
            <StudentCard
              key={student.id}
              student={student}
              onView={onViewStudent}
              onEdit={onEditStudent}
              onDelete={onDeleteStudent}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default StudentList;
