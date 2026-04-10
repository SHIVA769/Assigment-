import React, { useState, useEffect } from 'react';
import api from '../api';
import { Users, UserPlus, FileEdit, Trash2, BookOpen, X } from 'lucide-react';

const StudentList = ({ onTaskAdded }) => {
  const [students, setStudents] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [currentStudent, setCurrentStudent] = useState(null);
  
  // Student form
  const [name, setName] = useState('');
  const [className, setClassName] = useState('');
  const [rollNumber, setRollNumber] = useState('');
  
  // Task form
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDesc, setTaskDesc] = useState('');

  const fetchStudents = async () => {
    try {
      const data = await api.getStudents();
      setStudents(data);
    } catch (err) {
      console.error('Error fetching students', err);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleSaveStudent = async (e) => {
    e.preventDefault();
    try {
      if (currentStudent) {
        await api.updateStudent(currentStudent._id, { name, class: className, rollNumber });
      } else {
        await api.addStudent({ name, class: className, rollNumber });
      }
      setIsModalOpen(false);
      fetchStudents();
    } catch (err) {
      alert(err.message || 'Error saving student');
    }
  };

  const handleDelete = async (id) => {
    if(window.confirm('Are you sure you want to delete this student? All tasks will also be deleted.')){
      try {
        await api.deleteStudent(id);
        fetchStudents();
        onTaskAdded(); // refresh tasks list too
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleAssignTask = async (e) => {
    e.preventDefault();
    try {
      await api.addTask({
        studentId: currentStudent._id,
        title: taskTitle,
        description: taskDesc
      });
      setIsTaskModalOpen(false);
      onTaskAdded();
    } catch (err) {
      alert(err.message || 'Error assigning task');
    }
  };

  const openStudentModal = (student = null) => {
    if (student) {
      setCurrentStudent(student);
      setName(student.name);
      setClassName(student.class);
      setRollNumber(student.rollNumber);
    } else {
      setCurrentStudent(null);
      setName('');
      setClassName('');
      setRollNumber('');
    }
    setIsModalOpen(true);
  };

  const openTaskModal = (student) => {
    setCurrentStudent(student);
    setTaskTitle('');
    setTaskDesc('');
    setIsTaskModalOpen(true);
  };

  return (
    <div className="card">
      <div className="card-header">
        <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Users size={20} color="var(--primary)" /> Students Management
        </h3>
        <button className="btn btn-primary" style={{ width: 'auto', padding: '0.5rem 1rem' }} onClick={() => openStudentModal()}>
          <UserPlus size={16} /> Add Student
        </button>
      </div>
      <div className="card-body">
        {students.length === 0 ? (
          <p style={{ textAlign: 'center', color: 'var(--text-muted)' }}>No students found. Add one to get started.</p>
        ) : (
          students.map(student => (
            <div key={student._id} className="list-item">
              <div className="item-info">
                <h4>{student.name}</h4>
                <p>Class: {student.class} | Roll No: {student.rollNumber}</p>
              </div>
              <div className="action-buttons">
                <button className="icon-btn" title="Assign Homework" onClick={() => openTaskModal(student)}>
                  <BookOpen size={18} />
                </button>
                <button className="icon-btn" title="Edit Student" onClick={() => openStudentModal(student)}>
                  <FileEdit size={18} />
                </button>
                <button className="icon-btn delete" title="Delete Student" onClick={() => handleDelete(student._id)}>
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3>{currentStudent ? 'Edit Student' : 'Add New Student'}</h3>
              <button className="icon-btn" onClick={() => setIsModalOpen(false)}><X size={20}/></button>
            </div>
            <form onSubmit={handleSaveStudent}>
              <div className="modal-body">
                <div className="form-group">
                  <label>Name</label>
                  <input type="text" className="form-control" value={name} onChange={e => setName(e.target.value)} required />
                </div>
                <div className="form-group">
                  <label>Class</label>
                  <input type="text" className="form-control" value={className} onChange={e => setClassName(e.target.value)} required />
                </div>
                <div className="form-group">
                  <label>Roll Number</label>
                  <input type="text" className="form-control" value={rollNumber} onChange={e => setRollNumber(e.target.value)} required />
                </div>
              </div>
              <div className="modal-header" style={{ borderTop: '1px solid var(--border-color)', borderBottom: 'none' }}>
                <button type="button" className="btn btn-secondary" onClick={() => setIsModalOpen(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary" style={{ width: 'auto' }}>Save</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {isTaskModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3>Assign Task to {currentStudent?.name}</h3>
              <button className="icon-btn" onClick={() => setIsTaskModalOpen(false)}><X size={20}/></button>
            </div>
            <form onSubmit={handleAssignTask}>
              <div className="modal-body">
                <div className="form-group">
                  <label>Task Title</label>
                  <input type="text" className="form-control" value={taskTitle} onChange={e => setTaskTitle(e.target.value)} required />
                </div>
                <div className="form-group">
                  <label>Description</label>
                  <textarea className="form-control" rows="3" value={taskDesc} onChange={e => setTaskDesc(e.target.value)}></textarea>
                </div>
              </div>
              <div className="modal-header" style={{ borderTop: '1px solid var(--border-color)', borderBottom: 'none' }}>
                <button type="button" className="btn btn-secondary" onClick={() => setIsTaskModalOpen(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary" style={{ width: 'auto' }}>Assign Task</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentList;
