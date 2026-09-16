import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectCartItems } from '../../store/slices/cartSlice';
import { selectReservedShops } from '../../store/slices/reservedSlice';
import { selectPurchasedOrders } from '../../store/slices/purchasedSlice';
import style from './MyItemsPage.module.css';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

export default function MyItemsPage() {
  const [activeTab, setActiveTab] = useState('cart');

  const cartItems = useSelector(selectCartItems);
  const reservedShops = useSelector(selectReservedShops);
  const purchasedOrders = useSelector(selectPurchasedOrders);

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
              {cartItems.length === 0 ? <p>Your cart is empty</p> : null}
            </div>
          )}

          {activeTab === 'reserved' && (
            <div className={style.reservedSection}>
              {reservedShops.length === 0 ? (
                <p>No reserved items</p>
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
                          <img src={item.image} alt={item.title} />
                          <div>
                            <h4>{item.title}</h4>
                            <p>Price: {item.price} €</p>
                            <p>Size: {item.size}</p>
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
                <p>No purchased items yet</p>
              ) : (
                purchasedOrders.map((order) => (
                  <div key={order.orderId} className={style.shopCard}>
                    <div className={style.shopHeader}>
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
                          <img src={item.image} alt={item.title} />
                          <div>
                            <h4>{item.title}</h4>
                            <p>Price: {item.price} €</p>
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