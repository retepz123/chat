import { useState } from 'react';
import { useAuthStore } from '../components/lib/auth';
import { Link } from 'react-router';
import LoginPage from './Login';
import toast from 'react-hot-toast';

function Registration() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const { signup, isSigningUp } = useAuthStore();

  const validateForm = () => {
    if (!formData.username.trim())
      return toast.error('Username is required');

    if (!formData.email.trim())
      return toast.error('Email is required');

    if(!formData.password || formData.password.length < 6)
      return toast.error('Password is required and it must be least 6 characters');

    return true

  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const success = validateForm()
    if(success === true) signup(formData);
  };

  return (
    <div className='bg-red-500'>
      <h1 className='text-yellow'>Sign Up</h1>
      <form>
        <label type='username'>Username</label>
        <input
          type='text'
          placeholder=''
          value={formData.username}
          onChange={(e) =>
            setFormData({ ...formData, username: e.target.value })
          }
        />

        <label type='email'>E-mail</label>
        <input type='email' placeholder='' value={formData.email}
        onChange={(e) => setFormData({...formData, email: e.target.value})} />

          <label type='password'>Password</label>
          <input type='password' placeholder='' value={formData.password}
          onChange={(e) => setFormData({ ... formData, password: e.target.value})} />

          <button type='submit' >Create </button>
      </form>
      <Link to='/login'>Login</Link>
    </div>
  );
}

export default Registration;
