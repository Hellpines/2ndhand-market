import { Link } from 'react-router-dom';
import logo from '../../assets/logo.svg';
import styles from './Header.module.css';

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.leftContainer}>
          <Link to="/products" className={styles.logoLink}>
            <img src={logo} alt="2nd Hand Market Logo" className={styles.logoImg} />
            <div className={styles.logoText}>
              <span>2ND</span>
              <span>HAND</span>
              <span>MARKET</span>
            </div>
          </Link>

          <div className={styles.searchContainer}>
            <svg className={styles.searchIcon} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <input 
              type="text" 
              placeholder="" 
              className={styles.searchInput}
            />
          </div>
        </div>

        <div className={styles.navActions}>
          <nav className={styles.navLinks}>
            <Link to="/about" className={styles.navLink}>About us</Link>
            <Link to="/shops" className={styles.navLink}>All shops</Link>
            <Link to="/merchant" className={styles.navLink}>Become a merchant</Link>
          </nav>

          <div className={styles.actions}>
            <Link to="/favorites" className={styles.actionItem}>
              <svg className={styles.icon} width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
              </svg>
              <span>0</span>
            </Link>

            <Link to="/cart" className={styles.actionItem}>
              <svg className={styles.icon} width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 6h-2c0-2.76-2.24-5-5-5S7 3.24 7 6H5c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-7-3c1.66 0 3 1.34 3 3H9c0-1.66 1.34-3 3-3zm7 17H5V8h2v2c0 .55.45 1 1 1s1-.45 1-1V8h6v2c0 .55.45 1 1 1s1-.45 1-1V8h2v12z"/>
              </svg>
              <span>3</span>
            </Link>

            <Link to="/login" className={styles.actionItem}>
              <svg className={styles.icon} width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}