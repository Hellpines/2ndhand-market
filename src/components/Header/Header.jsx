import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { selectFavoritesCount } from '../../store/slices/favoritesSlice';
import { selectCartCount } from '../../store/slices/cartSlice';
import { selectSearchQuery, setSearchQuery } from '../../store/slices/filterSlice';

import Logo from '../../assets/logo.svg';
import styles from './Header.module.css';
import SearchIcon from '../../assets/search.svg';
import HeartIcon from '../../assets/heart.svg';
import BasketIcon from '../../assets/basket.svg';
import UserIcon from '../../assets/user.svg';

export default function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const favoritesCount = useSelector(selectFavoritesCount);
  const cartCount = useSelector(selectCartCount);
  const searchQuery = useSelector(selectSearchQuery);

  const handleSearchChange = (e) => {
    const value = e.target.value;

    dispatch(setSearchQuery(value));

    if (location.pathname !== '/' && value.trim() !== '') {
      navigate('/');
    }
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.leftContainer}>
          <Link to="/" className={styles.logoLink}>
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
              value={searchQuery}
              onChange={handleSearchChange}
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
            <Link to="/wish-list" className={styles.actionItem}>
              <HeartIcon className={favoritesCount > 0 ? styles.heartIcon : styles.heartIconInactive} />
              <span>{favoritesCount}</span>
            </Link>

            <Link to="/my-items" className={styles.actionItem}>
              <BasketIcon className={styles.basketIcon} />
              <span>{cartCount}</span>
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