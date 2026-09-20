import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import styles from './Layout.module.css';

export default function Layout({ children, isAuth = false, contentClassName = '' }) {
  return (
    <div className={styles.page}>
      <Header isAuth={isAuth} />
      <main className={`${styles.container} ${contentClassName}`.trim()}>{children}</main>
      <Footer />
    </div>
  );
}
