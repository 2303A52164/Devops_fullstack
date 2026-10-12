import React, { useState, useEffect, useMemo, useCallback } from 'react';
import Header from './components/Header';
import StudentList from './components/StudentList';
import StudentForm from './components/StudentForm';
import StudentDetails from './components/StudentDetails';
import DeleteConfirmModal from './components/DeleteConfirmModal';
import { SearchIcon, CheckIcon, AlertCircleIcon, UsersIcon, CloseIcon } from './components/Icons';
import './App.css';

const API_BASE_URL = 'http://localhost:5000/api/students';

function App() {
  const [students, setStudents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [apiError, setApiError] = useState(null);
  const [formError, setFormError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [backendHealthy, setBackendHealthy] = useState(true);

  // Filters and views
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBranch, setSelectedBranch] = useState('All');
  const [viewMode, setViewMode] = useState('table'); // 'table' or 'grid'

  // Modals & Active actions
  const [editingStudent, setEditingStudent] = useState(null);
  const [viewingStudent, setViewingStudent] = useState(null);
  const [deletingStudent, setDeletingStudent] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // Auto-dismiss success notifications
  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => setSuccessMessage(null), 4000);
      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  // Fetch students from backend
  const fetchStudents = useCallback(async () => {
    setIsLoading(true);
    setApiError(null);
    try {
      const response = await fetch(API_BASE_URL);
      if (!response.ok) {
        throw new Error(`API returned HTTP status ${response.status}: ${response.statusText}`);
      }
      const data = await response.json();
      setStudents(Array.isArray(data) ? data : []);
      setBackendHealthy(true);
    } catch (err) {
      console.error('Error fetching students:', err);
      setApiError(`Could not connect to backend server at port 5000 (${err.message}). Ensure the backend is running.`);
      setBackendHealthy(false);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Initial load
  useEffect(() => {
    fetchStudents();
  }, [fetchStudents]);

  // Handle Add or Update Student
  const handleFormSubmit = async (payload, studentIdToUpdate) => {
    setIsSubmitting(true);
    setFormError(null);

    try {
      if (studentIdToUpdate) {
        // PUT /api/students/:id - Update student
        const response = await fetch(`${API_BASE_URL}/${studentIdToUpdate}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(payload)
        });

        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message || 'Failed to update student record.');
        }

        // Update local list and state
        setStudents((prev) =>
          prev.map((s) => (s.id === studentIdToUpdate ? data : s))
        );
        setSuccessMessage(`Student '${data.name}' (${data.rollNo}) updated successfully.`);
        setEditingStudent(null);
        if (viewingStudent && viewingStudent.id === studentIdToUpdate) {
          setViewingStudent(data);
        }
      } else {
        // POST /api/students - Add new student
        const response = await fetch(API_BASE_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(payload)
        });

        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message || 'Failed to add new student.');
        }

        setStudents((prev) => [...prev, data]);
        setSuccessMessage(`Student '${data.name}' (${data.rollNo}) registered successfully.`);
      }
    } catch (err) {
      console.error('Form submission error:', err);
      setFormError(err.message || 'An error occurred while saving the student.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle Delete Confirmation
  const handleDeleteConfirm = async (studentId) => {
    setIsDeleting(true);
    try {
      const response = await fetch(`${API_BASE_URL}/${studentId}`, {
        method: 'DELETE'
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Failed to delete student.');
      }

      setStudents((prev) => prev.filter((s) => s.id !== studentId));
      setSuccessMessage(data.message || 'Student deleted successfully.');
      setDeletingStudent(null);
      if (viewingStudent && viewingStudent.id === studentId) {
        setViewingStudent(null);
      }
    } catch (err) {
      console.error('Delete error:', err);
      alert(`Delete Error: ${err.message}`);
    } finally {
      setIsDeleting(false);
    }
  };

  // Filter and search logic
  const filteredStudents = useMemo(() => {
    return students.filter((student) => {
      const matchesSearch =
        student.name?.toLowerCase().includes(searchTerm.toLowerCase().trim()) ||
        student.rollNo?.toLowerCase().includes(searchTerm.toLowerCase().trim());

      const matchesBranch =
        selectedBranch === 'All' ||
        student.branch?.toUpperCase() === selectedBranch.toUpperCase();

      return matchesSearch && matchesBranch;
    });
  }, [students, searchTerm, selectedBranch]);

  // Distinct branches list
  const branchList = useMemo(() => {
    const defaultBranches = ['CSE', 'ECE', 'MECH', 'CIVIL', 'IT'];
    const currentBranches = students.map((s) => s.branch?.toUpperCase()).filter(Boolean);
    return Array.from(new Set([...defaultBranches, ...currentBranches]));
  }, [students]);

  // Statistics calculation
  const stats = useMemo(() => {
    const total = students.length;
    const cseCount = students.filter((s) => s.branch?.toUpperCase() === 'CSE').length;
    const eceCount = students.filter((s) => s.branch?.toUpperCase() === 'ECE').length;
    const mechCount = students.filter((s) => s.branch?.toUpperCase() === 'MECH').length;
    return { total, cseCount, eceCount, mechCount };
  }, [students]);

  return (
    <div className="portal-app">
      {/* Header component */}
      <Header
        totalStudents={students.length}
        onRefresh={fetchStudents}
        isLoading={isLoading}
        backendHealthy={backendHealthy}
      />

      <main className="portal-main">
        <div className="portal-container">
          {/* Success Banner */}
          {successMessage && (
            <div className="alert-banner alert-success" role="status">
              <div className="alert-content">
                <CheckIcon className="alert-icon" size={20} />
                <span className="alert-text">{successMessage}</span>
              </div>
              <button
                type="button"
                className="alert-dismiss"
                onClick={() => setSuccessMessage(null)}
                aria-label="Dismiss alert"
              >
                <CloseIcon size={16} />
              </button>
            </div>
          )}

          {/* API Error Banner with Retry */}
          {apiError && (
            <div className="alert-banner alert-error" role="alert">
              <div className="alert-content">
                <AlertCircleIcon className="alert-icon" size={20} />
                <span className="alert-text">{apiError}</span>
              </div>
              <button
                type="button"
                className="btn-retry"
                onClick={fetchStudents}
              >
                Retry Connection
              </button>
            </div>
          )}

          {/* Metric KPI Cards (Display total number of students) */}
          <div className="stats-row">
            <div className="stat-card">
              <div className="stat-icon-wrap icon-primary">
                <UsersIcon size={22} />
              </div>
              <div className="stat-data">
                <span className="stat-label">Total Registered Students</span>
                <span className="stat-value">{stats.total}</span>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon-wrap icon-cse">
                <span className="stat-pill-label">CSE</span>
              </div>
              <div className="stat-data">
                <span className="stat-label">Computer Science & Eng.</span>
                <span className="stat-value">{stats.cseCount} Students</span>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon-wrap icon-ece">
                <span className="stat-pill-label">ECE</span>
              </div>
              <div className="stat-data">
                <span className="stat-label">Electronics & Comm.</span>
                <span className="stat-value">{stats.eceCount} Students</span>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon-wrap icon-mech">
                <span className="stat-pill-label">MECH</span>
              </div>
              <div className="stat-data">
                <span className="stat-label">Mechanical Engineering</span>
                <span className="stat-value">{stats.mechCount} Students</span>
              </div>
            </div>
          </div>

          {/* Main Workspace Layout */}
          <div className="portal-grid">
            {/* Left Column: Form Section */}
            <aside className="portal-sidebar">
              <StudentForm
                onSubmit={handleFormSubmit}
                isSubmitting={isSubmitting}
                editingStudent={editingStudent}
                onCancelEdit={() => setEditingStudent(null)}
                formError={formError}
                setFormError={setFormError}
              />
            </aside>

            {/* Right Column: Directory, Search, Filter & List Section */}
            <section className="portal-content">
              {/* Filter and Search Bar (Bonus Challenge) */}
              <div className="controls-card">
                <div className="search-bar-wrap">
                  <SearchIcon className="search-icon" size={18} />
                  <input
                    type="text"
                    className="search-input"
                    placeholder="Search by student name or roll number (e.g. Rahul, CSE101)..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  {searchTerm && (
                    <button
                      type="button"
                      className="search-clear-btn"
                      onClick={() => setSearchTerm('')}
                      title="Clear search"
                    >
                      <CloseIcon size={14} />
                    </button>
                  )}
                </div>

                <div className="filter-group">
                  <label htmlFor="branch-filter" className="filter-label">Branch Filter:</label>
                  <select
                    id="branch-filter"
                    className="branch-filter-select"
                    value={selectedBranch}
                    onChange={(e) => setSelectedBranch(e.target.value)}
                  >
                    <option value="All">All Branches</option>
                    {branchList.map((branch) => (
                      <option key={branch} value={branch}>
                        {branch}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Loading Indicator */}
              {isLoading ? (
                <div className="loading-state-card">
                  <div className="loading-spinner"></div>
                  <h4 className="loading-text">Fetching Student Records from Backend...</h4>
                  <p className="loading-sub">Connecting to http://localhost:5000/api/students</p>
                </div>
              ) : (
                /* StudentList component: Displays Table / Cards */
                <StudentList
                  students={filteredStudents}
                  viewMode={viewMode}
                  setViewMode={setViewMode}
                  onViewStudent={(student) => setViewingStudent(student)}
                  onEditStudent={(student) => {
                    setEditingStudent(student);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  onDeleteStudent={(student) => setDeletingStudent(student)}
                />
              )}
            </section>
          </div>
        </div>
      </main>

      {/* Student Details Modal */}
      {viewingStudent && (
        <StudentDetails
          student={viewingStudent}
          onClose={() => setViewingStudent(null)}
          onEdit={(student) => {
            setEditingStudent(student);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onDelete={(student) => setDeletingStudent(student)}
        />
      )}

      {/* Delete Confirmation Modal */}
      {deletingStudent && (
        <DeleteConfirmModal
          student={deletingStudent}
          onConfirm={handleDeleteConfirm}
          onCancel={() => setDeletingStudent(null)}
          isDeleting={isDeleting}
        />
      )}

      <footer className="portal-footer">
        <p>
          College Student Management System • Course Code: <strong>23CS102PE405</strong> (DevOps & Full Stack)
        </p>
      </footer>
    </div>
  );
}

export default App;
