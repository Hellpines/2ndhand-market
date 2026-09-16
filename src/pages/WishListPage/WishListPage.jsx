import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectCartItems } from '../../store/slices/cartSlice';
import { selectReservedShops } from '../../store/slices/reservedSlice';
import { selectPurchasedOrders } from '../../store/slices/purchasedSlice';
import style from './WishListPage.module.css';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

export default function WishListPage() {
  const [activeTab, setActiveTab] = useState('cart');

  return (
    <div className={style.page}>
      <Header />
      <main className={style.container}>
        <h1 className={style.pageTitle}>Wish List</h1>
        <div className={style.tabContent}>
        
        </div>
      </main>
      <Footer />
    </div>
  );
}