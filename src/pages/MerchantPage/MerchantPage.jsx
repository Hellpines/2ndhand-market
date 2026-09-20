import React, { useState } from 'react';
import Layout from '../../components/Layout/Layout';
import style from './MerchantPage.module.css';

export default function MerchantPage() {
  const [formData, setFormData] = useState({
    shopName: '',
    ownerName: '',
    email: '',
    phone: '',
    description: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setFormData({
      shopName: '',
      ownerName: '',
      email: '',
      phone: '',
      description: '',
    });
    setIsSubmitted(false);
  };

  return (
    <Layout contentClassName={style.content}>
      <div className={style.hero}>
        <h1 className={style.title}>Become a Merchant</h1>
        <p className={style.subtitle}>
          Join our 2ND HAND marketplace and start selling your items online
        </p>
      </div>

      <div className={style.card}>
        {isSubmitted ? (
          <div className={style.successState}>
            <div className={style.successIcon}>✓</div>
            <h2>Application Submitted!</h2>
            <p>
              Thank you for your interest. Our team will review your shop details and contact you soon.
            </p>
            <button type='button' onClick={handleReset} className={style.submitBtn}>
              Submit Another Application
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className={style.form}>
            <div className={style.field}>
              <label htmlFor='shopName'>Shop Name</label>
              <input
                id='shopName'
                type='text'
                name='shopName'
                placeholder='e.g. Vintage Treasures'
                value={formData.shopName}
                onChange={handleChange}
                required
              />
            </div>

            <div className={style.field}>
              <label htmlFor='ownerName'>Contact Person Name</label>
              <input
                id='ownerName'
                type='text'
                name='ownerName'
                placeholder='John Doe'
                value={formData.ownerName}
                onChange={handleChange}
                required
              />
            </div>

            <div className={style.row}>
              <div className={style.field}>
                <label htmlFor='email'>Email Address</label>
                <input
                  id='email'
                  type='email'
                  name='email'
                  placeholder='merchant@example.com'
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className={style.field}>
                <label htmlFor='phone'>Phone Number</label>
                <input
                  id='phone'
                  type='tel'
                  name='phone'
                  placeholder='+34 600 000 000'
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className={style.field}>
              <label htmlFor='description'>Shop Description & Location</label>
              <textarea
                id='description'
                name='description'
                rows='4'
                placeholder='Tell us about your second-hand store and its address...'
                value={formData.description}
                onChange={handleChange}
                required
              />
            </div>

            <button type='submit' className={style.submitBtn}>
              Submit Merchant Request
            </button>
          </form>
        )}
      </div>
    </Layout>
  );
}