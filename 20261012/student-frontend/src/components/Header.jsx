import React from 'react';
import { GraduationCapIcon, RefreshIcon } from './Icons';

const Header = ({ totalStudents, onRefresh, isLoading, backendHealthy }) => {
  return (
    <header className="app-header">
      <div className="header-container">
        <div className="brand-group">
          <div className="brand-logo">
            <GraduationCapIcon size={24} />
          </div>
          <div className="brand-text">
            <div className="brand-badge-row">
              <span className="brand-category">SCHOOL OF CSE & AI</span>
              <span className="academic-term">B.Tech • ODD Sem 2026-27</span>
            </div>
            <h1 className="app-title">College Student Management System</h1>
            <p className="app-subtitle">Centralized Student Records & Directory API</p>
          </div>
        </div>

        <div className="header-meta">
          <div className={`status-pill ${backendHealthy ? 'status-online' : 'status-offline'}`}>
            <span className="status-dot"></span>
            <span className="status-label">
              {backendHealthy ? 'API Connected (Port 5000)' : 'API Disconnected'}
            </span>
          </div>

          <button 
            type="button" 
            className="btn-refresh" 
            onClick={onRefresh} 
            title="Refresh student records"
            disabled={isLoading}
          >
            <RefreshIcon className={isLoading ? "spin-icon" : ""} size={16} />
            <span>Sync</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
