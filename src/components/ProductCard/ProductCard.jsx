import { useState } from 'react';
import style from './ProductCard.module.css';
import BasketIcon from '../../assets/basket.svg';
import HeartIcon from '../../assets/heart.svg';

export default function ProductCard({ product }) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  const price = Number(product.price) || 0;
  const originalPrice = Number(product.originalPrice) || 0;
  const discountPercent = Number(product.discountPercentage) || 0;

  const hasRealDiscount = originalPrice > price || discountPercent > 0;

  const formattedPrice = `${price.toFixed(2).replace('.', ',')} €`;

  let oldPriceFormatted = null;

  if (originalPrice > price) {
    oldPriceFormatted = `${originalPrice.toFixed(2).replace('.', ',')} €`;
  } else if (discountPercent > 0) {
    const calculatedOldPrice = price / (1 - discountPercent / 100);
    if (calculatedOldPrice > price) {
      oldPriceFormatted = `${calculatedOldPrice.toFixed(2).replace('.', ',')} €`;
    }
  }

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
          <HeartIcon className={style.heartIcon} />
        </button>

        <div className={style.badges}>
          {product.isNew && <span className={style.badgeNew}>New</span>}
          {hasRealDiscount && (
            <span className={style.badgeSale}>
              {discountPercent > 0 ? `-${Math.round(discountPercent)}%` : 'Sale'}
            </span>
          )}
        </div>
      </div>

      <div className={style.content}>
        <h3 className={style.title}>
          {product.title} - {product.brand || 'Brand'}
        </h3>

        <div className={style.footer}>
          <div className={style.priceBlock}>
            <span className={style.price}>{formattedPrice}</span>
            {hasRealDiscount && oldPriceFormatted && (
              <span className={style.oldPrice}>{oldPriceFormatted}</span>
            )}
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
              <BasketIcon className={style.basketIcon} />
            </button>
          )}
        </div>
      </div>
    </article>
  );
}