import { useState } from 'react';
import style from './ProductCard.module.css';

const HeartIcon = ({ isFilled }) => (
  <svg width="20" height="18" viewBox="0 0 20 18" fill={isFilled ? "#ffffff" : "none"} xmlns="http://www.w3.org/2000/svg">
    <path
      d="M14.5 1C12.76 1 11.14 1.81 10 3.09C8.86 1.81 7.24 1 5.5 1 C2.42 1 0 3.42 0 6.5C0 10.24 3.4 13.32 8.55 18C8.95 18.36 9.48 18.5 10 18.5C10.52 18.5 11.05 18.36 11.45 18C16.6 13.32 20 10.24 20 6.5C20 3.42 17.58 1 14.5 1Z"
      fill={isFilled ? "#ffffff" : "rgba(255, 255, 255, 0.8)"}
      stroke="#ffffff"
      strokeWidth="1.5"
    />
  </svg>
);

const BagIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M3.75 6H14.25L15 15.75H3L3.75 6Z"
      stroke="#4A5568"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M6 8.25V4.5C6 3.25736 7.00736 2.25 8.25 2.25H9.75C10.9926 2.25 12 3.25736 12 4.5V8.25"
      stroke="#4A5568"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default function ProductCard({ product }) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  const formattedPrice = `${product.price.toFixed(2).replace('.', ',')} €`;
  const hasDiscount = product.discountPercentage > 0;
  const oldPrice = hasDiscount
    ? `${(product.price * (1 + product.discountPercentage / 100)).toFixed(2).replace('.', ',')} €`
    : null;

  return (
    <article className={style.card}>
      <div className={style.imageWrapper}>
        <img src={product.thumbnail} alt={product.title} className={style.image} loading="lazy" />

        <button
          type="button"
          className={style.favoriteBtn}
          onClick={() => setIsFavorite(!isFavorite)}
          aria-label="Add to wishlist"
        >
          <HeartIcon isFilled={isFavorite} />
        </button>

        <div className={style.badges}>
          {product.id % 2 === 0 && <span className={style.badgeNew}>New</span>}
          {product.id % 3 === 0 && <span className={style.badgeReserved}>Reserved</span>}
        </div>
      </div>

      <div className={style.content}>
        <h3 className={style.title}>
          {product.title} - {product.brand || 'Brand'}
        </h3>

        <div className={style.footer}>
          <div className={style.priceBlock}>
            <span className={style.price}>{formattedPrice}</span>
            {oldPrice && <span className={style.oldPrice}>{oldPrice}</span>}
          </div>

          {isAdded ? (
            <span className={style.addedLabel}>Added</span>
          ) : (
            <button
              type="button"
              className={style.cartBtn}
              onClick={() => setIsAdded(true)}
              aria-label="Add to cart"
            >
              <BagIcon />
            </button>
          )}
        </div>
      </div>
    </article>
  );
}