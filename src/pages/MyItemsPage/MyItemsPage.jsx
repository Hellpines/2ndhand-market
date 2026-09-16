import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectCartItems, removeFromCart, clearCart } from '../../store/slices/cartSlice';
import { selectReservedShops, removeFromReserved } from '../../store/slices/reservedSlice';
import { selectPurchasedOrders, addPurchasedOrder } from '../../store/slices/purchasedSlice';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import style from './MyItemsPage.module.css';

export default function MyItemsPage() {
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState('cart');

  const cartItems = useSelector(selectCartItems);
  const reservedShops = useSelector(selectReservedShops);
  const purchasedOrders = useSelector(selectPurchasedOrders);

  const totalCartPrice = cartItems.reduce((sum, item) => sum + (Number(item.price) || 0), 0);

  const handleCheckout = () => {
    if (cartItems.length === 0) return;

    dispatch(
      addPurchasedOrder({
        shopName: cartItems[0]?.shop || '2ND HAND MARKET',
        items: cartItems,
      })
    );
    dispatch(clearCart());
    setActiveTab('purchased');
  };

  return (
    <div className={style.page}>
      <Header />
      <main className={style.container}>
        <div className={style.tabs}>
          <button
            type="button"
            className={`${style.tab} ${activeTab === 'cart' ? style.activeTab : ''}`}
            onClick={() => setActiveTab('cart')}
          >
            Cart ({cartItems.length})
          </button>
          <button
            type="button"
            className={`${style.tab} ${activeTab === 'reserved' ? style.activeTab : ''}`}
            onClick={() => setActiveTab('reserved')}
          >
            Reserved
          </button>
          <button
            type="button"
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
                  <div className={style.cartList}>
                    {cartItems.map((item) => (
                      <div key={item.id} className={style.cartItemRow}>
                        <img src={item.thumbnail || item.image} alt={item.title} />
                        <div className={style.itemDetails}>
                          <h4>{item.title}</h4>
                          <p>Size: {item.size || 'N/A'}</p>
                          <p className={style.price}>{item.price} €</p>
                        </div>
                        <button
                          type="button"
                          className={style.removeBtn}
                          onClick={() => dispatch(removeFromCart(item.id))}
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                  </div>

                  <div className={style.cartSummary}>
                    <h3>Order Summary</h3>
                    <div className={style.summaryRow}>
                      <span>Total:</span>
                      <strong>{totalCartPrice.toFixed(2)} €</strong>
                    </div>
                    <button type="button" className={style.checkoutBtn} onClick={handleCheckout}>
                      Proceed to Checkout
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
                            <p>Price: {item.price} €</p>
                            <p>Size: {item.size || 'N/A'}</p>
                            <button
                              type="button"
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
                            <p className={style.itemPrice}>Price: {item.price} €</p>
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
      </main>
      <Footer />
    </div>
  );
}