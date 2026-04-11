import React, { useState, useCallback } from 'react';
import { useAuth } from '../context/AuthContext';
import { LogOut, LayoutDashboard } from 'lucide-react';
import StudentList from './StudentList';
import TaskList from './TaskList';
import Toast from './Toast';

const Dashboard = () => {
  const { auth, logout } = useAuth();
  const [refreshTasks, setRefreshTasks] = useState(0);
  const [toasts, setToasts] = useState([]);

  const showToast = useCallback((message, type = 'success') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  const handleTaskAdded = () => {
    setRefreshTasks(prev => prev + 1);
  };

  return (
    <div>
      <nav className="navbar">
        <div className="navbar-brand">
          <LayoutDashboard style={{display: 'inline', marginRight: '8px', verticalAlign: 'middle'}}/>
          Gridaan School
        </div>
        <div className="nav-links">
          <span>Welcome, {auth.username}</span>
          <button className="logout-btn" onClick={logout} title="Logout">
            <LogOut size={20} />
          </button>
        </div>
      </nav>

      <div className="container">
        <div className="dashboard-grid">
          <StudentList onTaskAdded={handleTaskAdded} showToast={showToast} />
          <TaskList key={refreshTasks} refreshTrigger={refreshTasks} showToast={showToast} />
        </div>
      </div>

      <Toast toasts={toasts} removeToast={removeToast} />
    </div>
  );
};

export default Dashboard;
