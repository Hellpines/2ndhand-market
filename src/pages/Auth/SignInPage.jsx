import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../../store/slices/authSlice';
import Layout from '../../components/Layout/Layout';
import style from './Auth.module.css';

export default function SignInPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const existingUsers = JSON.parse(localStorage.getItem('users')) || [];

    const foundUser = existingUsers.find(
      (u) => u.email === formData.email && u.password === formData.password
    );

    if (!foundUser) {
      setError('Invalid email or password');
      return;
    }

    const { password, ...userSession } = foundUser;
    dispatch(loginSuccess(userSession));
    navigate('/');
  };

  return (
    <Layout isAuth contentClassName={style.content}>
      <div className={style.authCard}>
        <h1 className={style.title}>Sign In</h1>
        {error && <p className={style.errorMessage}>{error}</p>}

        <form onSubmit={handleSubmit} className={style.form}>
          <div className={style.field}>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              name="email"
              placeholder="example@mail.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className={style.field}>
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              name="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className={style.submitBtn}>
            Sign In
          </button>
        </form>

        <p className={style.switchText}>
          Don't have an account?
          <Link to="/signup">Sign Up</Link>
        </p>
      </div>
    </Layout>
  );
}