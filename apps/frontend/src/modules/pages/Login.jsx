import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// const LOGIN_URL = `${import.meta.env.VITE_BACKEND_URL}/api/auth/login`;

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('https://chat-me-qf7o.onrender.com', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ username, password }),
      });

     let data;
      try {
        data = await res.json();
      } catch {
        const text = await res.text();
        console.error('Non-JSON response from server:', text);
        alert('Server error: invalid response format.');
        return;
      }


      if(res.ok){

        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        console.log('Login Successfully:', data);

          setLoggedIn(true);

      } else {
        console.error('Login failed:', res.status, data.message);
        alert(data.message || 'Invalid username and password');
      }

    } catch (err) {
      console.error("Network or server error:", err);
    alert("Something went wrong. Please check your internet connection or try again later.");
    }
  }

  useEffect(() => {
    if (loggedIn) {
      const timer = setTimeout(() =>{
        navigate('/chat');
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