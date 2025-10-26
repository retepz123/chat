import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast'; // ✅ corrected import
import { Link } from 'react-router-dom';

const SIGN_UP_URL = `${import.meta.env.VITE_BACKEND_URL}/api/auth/register`;

function Registration() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: '',
    password: '',
    email: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const username = form.username.trim();
    const password = form.password;
    const email = form.email.trim();

    if (!username || !password || !email) {
      alert('Please input the data');
      return;
    }

    try {
      const res = await fetch(SIGN_UP_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await res.json();
      console.log(data);

      if (res.ok) {
        toast.success('Registered successfully! You can login now.');
        setForm({ username: '', email: '', password: '' });
        setTimeout(() => navigate('/login'), 1000);
      } else {
        toast.error(data.message || 'Registration failed');
      }
    } catch (error) {
      console.error('Registration error:', error);
      toast.error('Error in connecting to the server');
    }
  };

  return (
    <div>
      <form onSubmit={handleRegister}>
        <h1>Sign up</h1>
        <div>
          <label htmlFor='username'>Username</label>
          <input
            id='username'
            name='username'
            onChange={handleChange}
            value={form.username}
            required
          />
        </div>

        <div>
          <label htmlFor='password'>Password</label>
          <input
            id='password'
            name='password'
            type='password'
            onChange={handleChange}
            value={form.password}
            required
          />
        </div>

        <div>
          <label htmlFor='email'>Email</label>
          <input
            id='email'
            name='email'
            type='email'
            onChange={handleChange}
            value={form.email}
            required
          />
        </div>

        <button type='submit'>Submit</button>
        <Link to='/login' className='text-black-500'>Login</Link>
      </form>
    </div>
  );
}

export default Registration;
