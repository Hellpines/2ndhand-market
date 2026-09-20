import React, { useState, useMemo, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchProducts } from '../../services/productsApi';
import { toggleFilterValue, resetAllFilters } from '../../store/slices/filterSlice';
import Layout from '../../components/Layout/Layout';
import style from './ShopsPage.module.css';

export default function ShopsPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    let isMounted = true;

    const loadProducts = async () => {
      try {
        setIsLoading(true);
        setIsError(false);
        const response = await fetchProducts();

        if (isMounted) {
          setProducts(response.products || []);
        }
      } catch {
        if (isMounted) {
          setIsError(true);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadProducts();

    return () => {
      isMounted = false;
    };
  }, []);

  const shopsList = useMemo(() => {
    const shopMap = new Map();

    products.forEach((product) => {
      const shopName = product.shop || 'No shop name provided';
      const shopId = product.shopId || shopName.toLowerCase().replace(/\s+/g, '-');

      if (!shopMap.has(shopId)) {
        shopMap.set(shopId, {
          id: shopId,
          name: shopName,
          location: product.location || 'No address provided',
          workHours: product.workHours || 'No work hours provided',
          image: product.thumbnail || product.image,
          itemsCount: 1,
        });
      } else {
        const existing = shopMap.get(shopId);
        existing.itemsCount += 1;
      }
    });

    return Array.from(shopMap.values());
  }, [products]);

  const filteredShops = useMemo(() => {
    return shopsList.filter(
      (shop) =>
        shop.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        shop.location.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [shopsList, searchTerm]);

  const handleSelectShop = (shopName) => {
    dispatch(resetAllFilters());
    dispatch(toggleFilterValue({ category: 'shop', value: shopName }));
    navigate('/');
  };

  return (
    <Layout contentClassName={style.content}>
      <div className={style.hero}>
        <h1 className={style.title}>Our Partner Shops</h1>

        <div className={style.searchWrapper}>
          <input
            type='text'
            placeholder='Search shop by name or address...'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={style.searchInput}
          />
        </div>
      </div>

      {isLoading && <div className={style.status}>Loading shops...</div>}
      {isError && <div className={style.status}>Failed to load shops data</div>}

      {!isLoading && !isError && (
        <>
          {filteredShops.length === 0 ? (
            <div className={style.status}>No shops found matching '{searchTerm}'</div>
          ) : (
            <div className={style.grid}>
              {filteredShops.map((shop) => (
                <article key={shop.id} className={style.shopCard}>
                  <div className={style.imageWrapper}>
                    <img src={shop.image} alt={shop.name} className={style.shopImg} />
                    <span className={style.itemsBadge}>{shop.itemsCount} items</span>
                  </div>

                  <div className={style.cardBody}>
                    <h3 className={style.shopTitle}>{shop.name}</h3>

                    <div className={style.infoRow}>
                      <span className={style.infoLabel}>Address:</span>
                      <span className={style.infoValue}>{shop.location}</span>
                    </div>

                    <div className={style.infoRow}>
                      <span className={style.infoLabel}>Work Hours:</span>
                      <span className={style.infoValue}>{shop.workHours}</span>
                    </div>

                    <button
                      type='button'
                      className={style.viewProductsBtn}
                      onClick={() => handleSelectShop(shop.name)}
                    >
                      View Store Products
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </>
      )}
    </Layout>
  );
}