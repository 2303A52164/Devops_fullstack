import React, { useEffect } from 'react';
import { AlertCircleIcon, TrashIcon } from './Icons';

const DeleteConfirmModal = ({ student, onConfirm, onCancel, isDeleting }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && !isDeleting) onCancel();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onCancel, isDeleting]);

  if (!student) return null;

  return (
    <div className="modal-overlay" onClick={isDeleting ? undefined : onCancel} role="alertdialog" aria-modal="true">
      <div className="modal-container delete-modal" onClick={(e) => e.stopPropagation()}>
        <div className="delete-modal-header">
          <div className="delete-icon-circle">
            <AlertCircleIcon size={24} />
          </div>
          <div>
            <h3 className="delete-modal-title">Confirm Student Deletion</h3>
            <p className="delete-modal-subtitle">This action will remove the record from the database.</p>
          </div>
        </div>

        <div className="delete-modal-content">
          <p className="delete-prompt-text">
            Are you sure you want to permanently delete student{' '}
            <strong>{student.name}</strong> (Roll No: <span className="font-mono">{student.rollNo}</span>)?
          </p>
        </div>

        <div className="modal-footer">
          <button
            type="button"
            className="btn-secondary"
            onClick={onCancel}
            disabled={isDeleting}
          >
            Cancel
          </button>
          <button
            type="button"
            className="btn-danger"
            onClick={() => onConfirm(student.id)}
            disabled={isDeleting}
          >
            {isDeleting ? (
              <span className="btn-spinner-content">
                <span className="mini-spinner"></span>
                <span>Deleting...</span>
              </span>
            ) : (
              <>
                <TrashIcon size={15} />
                <span>Confirm Delete</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmModal;
