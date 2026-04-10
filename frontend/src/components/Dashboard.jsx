import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { LogOut, LayoutDashboard } from 'lucide-react';
import StudentList from './StudentList';
import TaskList from './TaskList';

const Dashboard = () => {
  const { auth, logout } = useAuth();
  const [refreshTasks, setRefreshTasks] = useState(0);

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
          <StudentList onTaskAdded={handleTaskAdded} />
          <TaskList key={refreshTasks} refreshTrigger={refreshTasks} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
