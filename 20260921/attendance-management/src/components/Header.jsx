import React from 'react';
import { BookOpen } from 'lucide-react';

const Header = () => {
  return (
    <header className="header">
      <div className="header-content">
        <BookOpen className="header-icon" />
        <h1>Student Attendance Management System</h1>
      </div>
    </header>
  );
};

export default Header;
