import { Link } from 'react-router-dom';
import Logo from '../../assets/logo.svg';
import styles from './Header.module.css';
import SearchIcon from '../../assets/search.svg';
import HeartIcon from '../../assets/heart.svg';
import BasketIcon from '../../assets/basket.svg';
import UserIcon from '../../assets/user.svg';

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.leftContainer}>
          <Link to="/products" className={styles.logoLink}>
            <Logo className={styles.logoImg} />
            <div className={styles.logoText}>
              <span>2ND</span>
              <span>HAND</span>
              <span>MARKET</span>
            </div>
          </Link>

          <div className={styles.searchContainer}>
            <SearchIcon className={styles.searchIcon} />
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
              <HeartIcon className={styles.heartIcon} />
              <span>0</span>
            </Link>

            <Link to="/cart" className={styles.actionItem}>
              <BasketIcon className={styles.basketIcon} />
              <span>3</span>
            </Link>

            <Link to="/login" className={styles.actionItem}>
              <UserIcon className={styles.userIcon} />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}