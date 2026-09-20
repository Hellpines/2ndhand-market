import React from 'react';
import { useSelector } from 'react-redux';
import { selectFavorites } from '../../store/slices/favoritesSlice';
import Layout from '../../components/Layout/Layout';
import ProductCard from '../../components/ProductCard/ProductCard';
import style from './WishListPage.module.css';

export default function WishListPage() {
  const favorites = useSelector(selectFavorites);

  return (
    <Layout contentClassName={style.content}>
      <div className={style.tabContainer}>
        <button
          type='button'
          className={`${style.tab} ${style.activeTab}`}
        >
          Wish List ({favorites.length})
        </button>
      </div>

      <div className={style.tabContent}>
        {favorites.length === 0 ? (
          <p className={style.emptySection}>Your wishlist is empty</p>
        ) : (
          <div className={style.grid}>
            {favorites.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}