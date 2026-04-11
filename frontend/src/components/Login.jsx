import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { User, Lock, Loader2, Eye, EyeOff } from 'lucide-react';
import api from '../api';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');
    try {
      if (isLogin) {
        const data = await api.login(username, password);
        login(data);
        navigate('/');
      } else {
        await api.register(username, password);
        setSuccess('Registration successful! Please login.');
        setIsLogin(true);
        setPassword('');
      }
    } catch (err) {
      setError(err.message || 'Failed to connect to server');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h1>Admin Portal</h1>
          <p>{isLogin ? 'Login to access dashboard' : 'Create an admin account'}</p>
        </div>
        {error && <div style={{color: 'var(--danger)', marginBottom: '1rem', textAlign: 'center'}}>{error}</div>}
        {success && <div style={{color: 'var(--secondary)', marginBottom: '1rem', textAlign: 'center'}}>{success}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Username</label>
            <div style={{position: 'relative'}}>
              <User style={{position: 'absolute', top: '10px', left: '10px', color: 'var(--text-muted)'}} size={20} />
              <input 
                type="text" 
                className="form-control" 
                placeholder="Enter admin username"
                style={{paddingLeft: '2.5rem'}}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="form-group">
            <label>Password</label>
            <div style={{position: 'relative'}}>
              <Lock style={{position: 'absolute', top: '10px', left: '10px', color: 'var(--text-muted)'}} size={20} />
              <input 
                type={showPassword ? 'text' : 'password'}
                className="form-control" 
                placeholder="Enter password"
                style={{paddingLeft: '2.5rem', paddingRight: '2.5rem'}}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute',
                  top: '50%',
                  right: '10px',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: 'var(--text-muted)',
                  padding: '0',
                  display: 'flex',
                  alignItems: 'center',
                }}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>
          <button type="submit" className="btn btn-primary" disabled={isLoading}>
            {isLoading ? <Loader2 className="animate-spin" /> : (isLogin ? 'Sign In' : 'Register')}
          </button>
        </form>
        <div style={{marginTop: '1rem', textAlign: 'center'}}>
           <button 
             onClick={() => { setIsLogin(!isLogin); setError(''); setSuccess(''); }} 
             style={{background: 'none', border: 'none', color: 'var(--primary)', cursor: 'pointer', textDecoration: 'underline'}}>
             {isLogin ? 'Need an account? Register' : 'Already have an account? Login'}
           </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
