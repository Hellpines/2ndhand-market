import { lazy } from 'react';
import Header from '../Header/Header';
import styles from './Layout.module.css';
import Footer from '../Footer/Footer';

export default function Layout({ children, isAuth = false, contentClassName = '' }) {
  return (
    <div className={styles.page}>
      <Header isAuth={isAuth} />
      <main className={`${styles.container} ${contentClassName}`.trim()}>{children}</main>
      <Footer />
    </div>
  );
}
