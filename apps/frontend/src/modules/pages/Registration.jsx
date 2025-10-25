
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Registration() {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [ form, setForm ] = useState({
    username: '',
    password: '',
    email: ''
  });

  const handleChange = (e) => {
    setForm({...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try{
      const SIGN_UP_URL = `${import.meta.env.VITE_BACKEND_URL}/api/auth/register`;

      const res = await fetch(SIGN_UP_URL, form);

      setMessage(res.data.message || 'Registration Successful');
      console.log('Success', res.data);
    } catch (err){
      console.error('Error during registration', err);
      setMessage('Registration Failed');
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor='username'>Username</label>
          <input id='username' name='username' placeholder='' onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor='password'>Password</label> 
          <input id='password' name='password' placeholder='' onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor='email'>Email</label>
          <input id='email' name='email' placeholder='' onChange={handleChange} required />
        </div>
        <button type='submit'>Submit</button>
      </form>
    </div>
  );
}

export default  Registration;