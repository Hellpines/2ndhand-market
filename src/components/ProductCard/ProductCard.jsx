import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleFavorite, selectFavorites } from '../../store/slices/favoritesSlice';
import { addToCart, removeFromCart, selectCartItems } from '../../store/slices/cartSlice';
import { addToReserved, selectReservedShops } from '../../store/slices/reservedSlice';
import { addPurchasedOrder } from '../../store/slices/purchasedSlice';
import style from './ProductCard.module.css';
import BasketIcon from '../../assets/basket.svg';
import HeartIcon from '../../assets/heart.svg';

export default function ProductCard({ product, variant = 'catalog', onCheckoutSingle }) {
  const dispatch = useDispatch();

  const favorites = useSelector(selectFavorites);
  const cartItems = useSelector(selectCartItems);
  const reservedShops = useSelector(selectReservedShops);

  const isFavorite = favorites.some((item) => item.id === product.id);
  const isAdded = cartItems.some((item) => item.id === product.id);

  const isReservedInStore = reservedShops.some((shop) =>
    shop.items.some((item) => item.id === product.id)
  );

  const handleReserve = () => {
    dispatch(addToReserved(product));
  };

  const handleRemoveFromCart = () => {
    dispatch(removeFromCart(product.id));
  };

  const handleSingleCheckout = () => {
    if (onCheckoutSingle) {
      onCheckoutSingle(product);
    } else {
      dispatch(
        addPurchasedOrder({
          shopName: product.shop || '2ND HAND MARKET',
          items: [product],
        })
      );
      dispatch(removeFromCart(product.id));
    }
  };

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
        <img
          src={product.thumbnail || product.image}
          alt={product.title}
          className={style.image}
          loading="lazy"
        />

        <button
          type="button"
          className={style.favoriteBtn}
          onClick={() => dispatch(toggleFavorite(product))}
          aria-label={isFavorite ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <HeartIcon
            className={`${style.heartIcon} ${isFavorite ? style.favoriteActive : ''}`}
          />
        </button>

        <div className={style.badges}>
          {product.isNew && <span className={style.badgeNew}>New</span>}
          {(product.isReserved || isReservedInStore) && (
            <span className={style.badgeReserved}>Reserved</span>
          )}
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

          {variant === 'cart' ? (
            <div className={style.cartActions}>
              <button
                type="button"
                className={style.removeBtn}
                onClick={handleRemoveFromCart}
              >
                Remove
              </button>
              <button
                type="button"
                className={style.checkoutCardBtn}
                onClick={handleSingleCheckout}
              >
                Buy
              </button>
            </div>
          ) : isAdded ? (
            <span className={style.addedLabel}>Added</span>
          ) : (product.isReserved || isReservedInStore) ? (
            <span className={style.reservedLabel}>Reserved</span>
          ) : (
            <div className={style.actions}>
              <button
                type="button"
                onClick={handleReserve}
                className={style.reserveBtn}
              >
                Reserve
              </button>
              <button
                type="button"
                className={style.cartBtn}
                onClick={() => dispatch(addToCart(product))}
                aria-label="Add to cart"
              >
                <BasketIcon className={style.basketIcon} />
              </button>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}