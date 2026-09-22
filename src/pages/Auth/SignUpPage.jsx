import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../../store/slices/authSlice';
import Layout from '../../components/Layout/Layout';
import useForm from '../../hooks/useForm';
import useLocalStorage from '../../hooks/useLocalStorage';
import style from './Auth.module.css';

export default function SignUpPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { read, write } = useLocalStorage();

  const { formData, handleChange } = useForm({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    const existingUsers = read('users', []);

    const userExists = existingUsers.some((u) => u.email === formData.email);
    if (userExists) {
      setError('User with this email already exists');
      return;
    }

    const newUser = {
      id: Date.now().toString(),
      name: formData.name,
      email: formData.email,
      password: formData.password,
    };

    const { password, ...safeUser } = newUser;
    existingUsers.push(safeUser);
    write('users', existingUsers);

    dispatch(loginSuccess(safeUser));
    navigate('/');
  };

  return (
    <Layout isAuth contentClassName={style.content}>
      <div className={style.authCard}>
        <h1 className={style.title}>Sign Up</h1>
        {error && <p className={style.errorMessage}>{error}</p>}

        <form onSubmit={handleSubmit} className={style.form}>
          <div className={style.field}>
            <label htmlFor='name'>Full Name</label>
            <input
              id='name'
              type='text'
              name='name'
              placeholder='John Doe'
              value={formData.name}
              onChange={(e) => {
                handleChange(e);
                if (error) setError('');
              }}
              required
            />
          </div>
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
          <div className={style.field}>
            <label htmlFor='confirmPassword'>Confirm Password</label>
            <input
              id='confirmPassword'
              type='password'
              name='confirmPassword'
              placeholder='••••••••'
              value={formData.confirmPassword}
              onChange={(e) => {
                handleChange(e);
                if (error) setError('');
              }}
              required
            />
          </div>
          <button type='submit' className={style.submitBtn}>
            Create Account
          </button>
        </form>

        <p className={style.switchText}>
          Already have an account?
          <Link to='/login'>Sign In</Link>
        </p>
      </div>
    </Layout>
  );
}