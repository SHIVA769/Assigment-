import React, { useState, useEffect } from 'react';
import api from '../api';
import { BookOpen, CheckCircle, Trash2, AlertCircle } from 'lucide-react';

const TaskList = ({ refreshTrigger }) => {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    try {
      const data = await api.getTasks();
      setTasks(data);
    } catch (err) {
      console.error('Error fetching tasks', err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [refreshTrigger]);

  const handleMarkComplete = async (task) => {
    try {
      await api.updateTask(task._id, { isCompleted: !task.isCompleted });
      fetchTasks();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if(window.confirm('Are you sure you want to delete this task?')) {
      try {
        await api.deleteTask(id);
        fetchTasks();
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <div className="card">
      <div className="card-header">
        <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <BookOpen size={20} color="var(--primary)" /> Tasks & Assignments
        </h3>
      </div>
      <div className="card-body">
        {tasks.length === 0 ? (
          <div style={{ textAlign: 'center', color: 'var(--text-muted)', marginTop: '2rem' }}>
            <AlertCircle size={40} style={{ margin: '0 auto', opacity: 0.5 }} />
            <p style={{ marginTop: '1rem' }}>No tasks assigned yet.</p>
          </div>
        ) : (
          tasks.map(task => (
            <div key={task._id} className="list-item" style={{ opacity: task.isCompleted ? 0.7 : 1 }}>
              <div className="item-info">
                <h4 style={{ textDecoration: task.isCompleted ? 'line-through' : 'none' }}>{task.title}</h4>
                <p>
                  <span style={{ fontWeight: '500', color: 'var(--text-main)' }}>{task.studentId?.name || 'Unknown'}</span> 
                  {task.studentId?.class ? ` (${task.studentId.class})` : ''}
                </p>
                {task.description && <p style={{ marginTop: '0.25rem', fontStyle: 'italic' }}>{task.description}</p>}
                <div style={{ marginTop: '0.5rem' }}>
                  {task.isCompleted ? (
                    <span className="badge badge-success">Completed</span>
                  ) : (
                    <span className="badge badge-warning">Pending</span>
                  )}
                </div>
              </div>
              <div className="action-buttons">
                <button 
                  className={`icon-btn check`} 
                  onClick={() => handleMarkComplete(task)}
                  title={task.isCompleted ? "Mark as Pending" : "Mark as Completed"}
                  style={{ color: task.isCompleted ? 'var(--secondary)' : '' }}
                >
                  <CheckCircle size={20} />
                </button>
                <button className="icon-btn delete" onClick={() => handleDelete(task._id)} title="Delete Task">
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TaskList;
