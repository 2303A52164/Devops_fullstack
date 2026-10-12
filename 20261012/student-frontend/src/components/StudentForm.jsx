import React, { useState, useEffect } from 'react';
import { PlusIcon, EditIcon, CloseIcon } from './Icons';

const BRANCH_OPTIONS = ['CSE', 'ECE', 'MECH', 'CIVIL', 'IT', 'AI & DS', 'EEE'];

const StudentForm = ({
  onSubmit,
  isSubmitting,
  editingStudent,
  onCancelEdit,
  formError,
  setFormError
}) => {
  const [formData, setFormData] = useState({
    name: '',
    rollNo: '',
    branch: 'CSE',
    email: '',
    semester: '6th Semester',
    cgpa: ''
  });

  // When editing student changes, populate or reset form
  useEffect(() => {
    if (editingStudent) {
      setFormData({
        name: editingStudent.name || '',
        rollNo: editingStudent.rollNo || '',
        branch: editingStudent.branch || 'CSE',
        email: editingStudent.email || '',
        semester: editingStudent.semester || '6th Semester',
        cgpa: editingStudent.cgpa || ''
      });
      if (setFormError) setFormError(null);
    } else {
      setFormData({
        name: '',
        rollNo: '',
        branch: 'CSE',
        email: '',
        semester: '6th Semester',
        cgpa: ''
      });
    }
  }, [editingStudent]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
    if (formError && setFormError) setFormError(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      if (setFormError) setFormError('Student name is required.');
      return;
    }
    if (!formData.rollNo.trim()) {
      if (setFormError) setFormError('Roll number is required.');
      return;
    }
    if (!formData.branch.trim()) {
      if (setFormError) setFormError('Branch is required.');
      return;
    }

    const payload = {
      name: formData.name.trim(),
      rollNo: formData.rollNo.trim().toUpperCase(),
      branch: formData.branch.trim().toUpperCase(),
      email: formData.email.trim() || `${formData.rollNo.trim().toLowerCase()}@college.edu`,
      semester: formData.semester.trim() || 'Current',
      cgpa: formData.cgpa.trim() || 'N/A'
    };

    onSubmit(payload, editingStudent?.id);
  };

  const handleReset = () => {
    setFormData({
      name: '',
      rollNo: '',
      branch: 'CSE',
      email: '',
      semester: '6th Semester',
      cgpa: ''
    });
    if (setFormError) setFormError(null);
    if (editingStudent && onCancelEdit) {
      onCancelEdit();
    }
  };

  return (
    <div className="student-form-card">
      <div className="form-card-header">
        <div className="form-header-title-wrap">
          <div className="form-icon-circle">
            {editingStudent ? <EditIcon size={18} /> : <PlusIcon size={18} />}
          </div>
          <div>
            <h3 className="form-title">
              {editingStudent ? 'Update Student Record' : 'Add New Student'}
            </h3>
            <p className="form-subtitle">
              {editingStudent
                ? `Modifying details for ${editingStudent.rollNo}`
                : 'Enter details to register student into the database'}
            </p>
          </div>
        </div>

        {editingStudent && (
          <button
            type="button"
            className="btn-cancel-edit-pill"
            onClick={handleReset}
            title="Cancel editing mode"
          >
            <CloseIcon size={14} />
            <span>Cancel Edit</span>
          </button>
        )}
      </div>

      {formError && (
        <div className="form-error-banner" role="alert">
          <span>{formError}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="student-form">
        <div className="form-grid">
          {/* Student Name */}
          <div className="form-field">
            <label htmlFor="student-name" className="field-label">
              Student Name <span className="required-star">*</span>
            </label>
            <input
              id="student-name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g. Rahul Sharma"
              className="field-input"
              required
              autoComplete="off"
            />
          </div>

          {/* Roll Number */}
          <div className="form-field">
            <label htmlFor="student-rollNo" className="field-label">
              Roll Number <span className="required-star">*</span>
            </label>
            <input
              id="student-rollNo"
              type="text"
              name="rollNo"
              value={formData.rollNo}
              onChange={handleChange}
              placeholder="e.g. CSE101"
              className="field-input uppercase-input"
              required
              autoComplete="off"
            />
          </div>

          {/* Branch */}
          <div className="form-field">
            <label htmlFor="student-branch" className="field-label">
              Branch <span className="required-star">*</span>
            </label>
            <select
              id="student-branch"
              name="branch"
              value={formData.branch}
              onChange={handleChange}
              className="field-select"
              required
            >
              {BRANCH_OPTIONS.map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </select>
          </div>

          {/* Email */}
          <div className="form-field">
            <label htmlFor="student-email" className="field-label">
              Institutional Email
            </label>
            <input
              id="student-email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="e.g. rahul.cse101@college.edu"
              className="field-input"
              autoComplete="off"
            />
          </div>

          {/* Semester */}
          <div className="form-field">
            <label htmlFor="student-semester" className="field-label">
              Academic Semester
            </label>
            <select
              id="student-semester"
              name="semester"
              value={formData.semester}
              onChange={handleChange}
              className="field-select"
            >
              <option value="1st Semester">1st Semester</option>
              <option value="2nd Semester">2nd Semester</option>
              <option value="3rd Semester">3rd Semester</option>
              <option value="4th Semester">4th Semester</option>
              <option value="5th Semester">5th Semester</option>
              <option value="6th Semester">6th Semester</option>
              <option value="7th Semester">7th Semester</option>
              <option value="8th Semester">8th Semester</option>
            </select>
          </div>

          {/* CGPA */}
          <div className="form-field">
            <label htmlFor="student-cgpa" className="field-label">
              Cumulative CGPA
            </label>
            <input
              id="student-cgpa"
              type="number"
              step="0.01"
              min="0"
              max="10"
              name="cgpa"
              value={formData.cgpa}
              onChange={handleChange}
              placeholder="e.g. 8.75"
              className="field-input"
            />
          </div>
        </div>

        <div className="form-actions-row">
          <button
            type="button"
            className="btn-secondary"
            onClick={handleReset}
            disabled={isSubmitting}
          >
            {editingStudent ? 'Cancel' : 'Reset Form'}
          </button>

          <button
            type="submit"
            className="btn-primary"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <span className="btn-spinner-content">
                <span className="mini-spinner"></span>
                <span>Saving...</span>
              </span>
            ) : editingStudent ? (
              <>
                <EditIcon size={16} />
                <span>Update Student</span>
              </>
            ) : (
              <>
                <PlusIcon size={16} />
                <span>Add Student</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default StudentForm;
