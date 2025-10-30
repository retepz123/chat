import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { axiosInstance } from '../components/lib/axios';

const LOGIN_URL = `${import.meta.env.VITE_BACKEND_URL}/api/auth/login`;

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
        const res = await axiosInstance.post('/auth/login', { username, password });

      if (res.data?.token) {
        // ✅ Save token and user info
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('user', JSON.stringify(res.data.user));

        console.log('Login successful:', res.data);

        setLoggedIn(true);
      } else {
        alert('Login failed: token not received.');
      }

    } catch (err) {
      console.error('Login error:', err.response?.data || err.message);
      alert(err.response?.data?.message || 'Invalid username or password');
    }
  };

  useEffect(() => {
    if (loggedIn) {
      const timer = setTimeout(() => {
        navigate('/chat'); // 👈 redirect after login
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [loggedIn, navigate]);

  return ( 
    <div>
      <form onSubmit={handleLogin}>
        <h1>Login</h1>
        <div>
          <input type='text' placeholder='Username' value={username} onChange={(e) => setUsername(e.target.value)} required />
          <input type='password' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <div>
          <button type='submit'>Submit</button>
        </div>
      </form>

    </div>
  );
}

export default LoginPage;