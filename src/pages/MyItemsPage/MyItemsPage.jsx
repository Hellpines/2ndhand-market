import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectCartItems, removeFromCart, clearCart } from '../../store/slices/cartSlice';
import { selectReservedShops, removeFromReserved } from '../../store/slices/reservedSlice';
import { selectPurchasedOrders, addPurchasedOrder } from '../../store/slices/purchasedSlice';
import Layout from '../../components/Layout/Layout';
import ProductCard from '../../components/ProductCard/ProductCard';
import style from './MyItemsPage.module.css';

export default function MyItemsPage() {
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState('cart');

  const cartItems = useSelector(selectCartItems);
  const reservedShops = useSelector(selectReservedShops);
  const purchasedOrders = useSelector(selectPurchasedOrders);

  const totalCartPrice = cartItems.reduce((sum, item) => sum + (Number(item.price) || 0), 0);

  const handleCheckoutAll = () => {
    if (cartItems.length === 0) return;

    dispatch(
      addPurchasedOrder({
        orderId: `ORD-${Date.now()}`,
        purchaseDate: new Date().toLocaleDateString('en-GB', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
        }),
        shopName: cartItems[0]?.shop || '2ND HAND MARKET',
        items: cartItems,
      })
    );
    dispatch(clearCart());
    setActiveTab('purchased');
  };

  const handleCheckoutSingle = (product) => {
    dispatch(
      addPurchasedOrder({
        orderId: `ORD-${Date.now()}`,
        purchaseDate: new Date().toLocaleDateString('en-GB', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
        }),
        shopName: product.shop || '2ND HAND MARKET',
        items: [product],
      })
    );
    dispatch(removeFromCart(product.id));
    setActiveTab('purchased');
  };

  return (
    <Layout contentClassName={style.content}>
      <div className={style.tabs}>
        <button
          type='button'
          className={`${style.tab} ${activeTab === 'cart' ? style.activeTab : ''}`}
          onClick={() => setActiveTab('cart')}
        >
          Cart ({cartItems.length})
        </button>
        <button
          type='button'
          className={`${style.tab} ${activeTab === 'reserved' ? style.activeTab : ''}`}
          onClick={() => setActiveTab('reserved')}
        >
          Reserved
        </button>
        <button
          type='button'
          className={`${style.tab} ${activeTab === 'purchased' ? style.activeTab : ''}`}
          onClick={() => setActiveTab('purchased')}
        >
          Purchased
        </button>
      </div>

      <div className={style.tabContent}>
        {activeTab === 'cart' && (
          <div className={style.cartSection}>
            {cartItems.length === 0 ? (
              <p className={style.emptySection}>Your cart is empty</p>
            ) : (
              <div className={style.cartWrapper}>
                <div className={style.cartGrid}>
                  {cartItems.map((item) => (
                    <ProductCard
                      key={item.id}
                      product={item}
                      variant='cart'
                      onCheckoutSingle={handleCheckoutSingle}
                    />
                  ))}
                </div>

                <div className={style.cartSummary}>
                  <h3>Order Summary</h3>
                  <div className={style.summaryRow}>
                    <span>Total:</span>
                    <strong>{totalCartPrice.toFixed(2)} €</strong>
                  </div>
                  <button type='button' className={style.checkoutBtn} onClick={handleCheckoutAll}>
                    Checkout All
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'reserved' && (
          <div className={style.reservedSection}>
            {reservedShops.length === 0 ? (
              <p className={style.emptySection}>No reserved items</p>
            ) : (
              reservedShops.map((group) => (
                <div key={group.shopId} className={style.shopCard}>
                  <div className={style.shopHeader}>
                    <div>
                      <strong>Shop:</strong> {group.shopName}
                    </div>
                    <div>
                      <strong>Location:</strong> {group.location}
                    </div>
                    <div>
                      <strong>Work hours:</strong> {group.workHours}
                    </div>
                    <div>
                      <strong>Reserved time:</strong> {group.reservedTime}
                    </div>
                  </div>
                  <div className={style.itemsGrid}>
                    {group.items.map((item) => (
                      <div key={item.id} className={style.itemCard}>
                        <img src={item.thumbnail || item.image} alt={item.title} />
                        <div className={style.itemInfo}>
                          <h4>{item.title}</h4>
                          <p>Price: <span>{item.price} €</span></p>
                          <p>Size: <span>{item.size || 'N/A'}</span></p>
                          <p>Color: <span>{item.color || 'N/A'}</span></p>
                          <button
                            type='button'
                            className={style.cancelReserveBtn}
                            onClick={() =>
                              dispatch(
                                removeFromReserved({ shopId: group.shopId, productId: item.id })
                              )
                            }
                          >
                            Cancel Reserve
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {activeTab === 'purchased' && (
          <div className={style.purchasedSection}>
            {purchasedOrders.length === 0 ? (
              <p className={style.emptySection}>No purchased items yet</p>
            ) : (
              purchasedOrders.map((order) => (
                <div key={order.orderId} className={style.shopCard}>
                  <div className={style.shopHeader}>
                    <div>
                      <strong>Order ID:</strong> {order.orderId}
                    </div>
                    <div>
                      <strong>Shop:</strong> {order.shopName}
                    </div>
                    <div>
                      <strong>Purchased Date:</strong> {order.purchaseDate}
                    </div>
                  </div>
                  <div className={style.itemsGrid}>
                    {order.items.map((item) => (
                      <div key={item.id} className={style.itemCard}>
                        <img src={item.thumbnail || item.image} alt={item.title} />
                        <div className={style.itemInfo}>
                          <h4>{item.title}</h4>
                          <p>Price: <span>{item.price} €</span></p>
                          <p>Size: <span>{item.size || 'N/A'}</span></p>
                          <p>Color: <span>{item.color || 'N/A'}</span></p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </Layout>
  );
}