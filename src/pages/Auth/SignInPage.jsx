import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../../store/slices/authSlice';
import Layout from '../../components/Layout/Layout';
import useForm from '../../hooks/useForm';
import useLocalStorage from '../../hooks/useLocalStorage';
import style from './Auth.module.css';

export default function SignInPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { read } = useLocalStorage();

  const { formData, handleChange } = useForm({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const existingUsers = read('users', []);

    const foundUser = existingUsers.find((u) => u.email === formData.email);

    if (!foundUser) {
      setError('Invalid email or password');
      return;
    }

    dispatch(loginSuccess(foundUser));
    navigate('/');
  };

  return (
    <Layout isAuth contentClassName={style.content}>
      <div className={style.authCard}>
        <h1 className={style.title}>Sign In</h1>
        {error && <p className={style.errorMessage}>{error}</p>}

        <form onSubmit={handleSubmit} className={style.form}>
          <div className={style.field}>
            <label htmlFor='email'>Email</label>
            <input
              id='email'
              type='email'
              name='email'
              placeholder='example@mail.com'
              value={formData.email}
              onChange={(e) => {
                handleChange(e);
                if (error) setError('');
              }}
              required
            />
          </div>
          <div className={style.field}>
            <label htmlFor='password'>Password</label>
            <input
              id='password'
              type='password'
              name='password'
              placeholder='••••••••'
              value={formData.password}
              onChange={(e) => {
                handleChange(e);
                if (error) setError('');
              }}
              required
            />
          </div>
          <button type='submit' className={style.submitBtn}>
            Sign In
          </button>
        </form>

        <p className={style.switchText}>
          Don't have an account?
          <Link to='/signup'>Sign Up</Link>
        </p>
      </div>
    </Layout>
  );
}