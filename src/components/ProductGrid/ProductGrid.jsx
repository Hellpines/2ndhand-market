import { useState, useMemo } from 'react';
import { useGetProductsQuery } from '../../services/productsApi';
import ProductCard from '../ProductCard/ProductCard';
import FilterBar from '../FilterBar/FilterBar';
import Breadcrumbs from '../Breadcrumbs/Breadcrumbs';
import style from './ProductGrid.module.css';

export default function ProductGrid({
  activeDepartment,
  activeCategory,
  onSelectDepartment,
  onSelectCategory,
  onResetAll,
}) {
  const { data, isLoading, isError } = useGetProductsQuery();

  const [filters, setFilters] = useState({});
  const [sortBy, setSortBy] = useState(null);

  const rawProducts = data?.products || [];

  const isSaleFilterActive = filters.isSale;

  const availableOptions = useMemo(() => {
    let categoryProducts = rawProducts;

    if (activeDepartment) {
      categoryProducts =
        activeDepartment === 'new'
          ? categoryProducts.filter((p) => p.isNew)
          : categoryProducts.filter((p) => p.department === activeDepartment);
    }

    if (activeCategory && activeCategory !== 'all') {
      categoryProducts = categoryProducts.filter((p) => p.category === activeCategory);
    }

    if (isSaleFilterActive) {
      categoryProducts = categoryProducts.filter((p) => Number(p.discountPercentage) > 0);
    }

    const brands = new Set();
    const colors = new Set();
    const sizes = new Set();
    const shops = new Set();

    categoryProducts.forEach((p) => {
      if (p.brand) brands.add(p.brand);
      if (p.color) colors.add(p.color);
      if (p.size) sizes.add(p.size);
      if (p.shop) shops.add(p.shop);
    });

    return {
      brands: Array.from(brands),
      colors: Array.from(colors),
      sizes: Array.from(sizes),
      shops: Array.from(shops),
    };
  }, [rawProducts, activeDepartment, activeCategory, isSaleFilterActive]);

  const filteredProducts = useMemo(() => {
    let result = [...rawProducts];

    if (activeDepartment) {
      result =
        activeDepartment === 'new'
          ? result.filter((p) => p.isNew)
          : result.filter((p) => p.department === activeDepartment);
    }

    if (activeCategory && activeCategory !== 'all') {
      result = result.filter((p) => p.category === activeCategory);
    }

    if (filters.color) {
      result = result.filter((p) => p.color === filters.color);
    }

    if (filters.size) {
      result = result.filter((p) => String(p.size) === String(filters.size));
    }

    if (filters.brand) {
      result = result.filter((p) => p.brand === filters.brand);
    }

    if (filters.shop) {
      result = result.filter((p) => p.shop === filters.shop);
    }

    if (filters.condition) {
      result = result.filter(
        (p) =>
          p.condition &&
          p.condition.toLowerCase() === filters.condition.toLowerCase()
      );
    }

    if (isSaleFilterActive) {
      result = result.filter((p) => Number(p.discountPercentage) > 0);
    }

    if (filters.priceRange) {
      if (filters.priceRange === '0-30') {
        result = result.filter((p) => p.price <= 30);
      } else if (filters.priceRange === '30-50') {
        result = result.filter((p) => p.price > 30 && p.price <= 50);
      } else if (filters.priceRange === '50+') {
        result = result.filter((p) => p.price > 50);
      }
    }

    if (sortBy === 'asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'desc') {
      result.sort((a, b) => b.price - a.price);
    }

    return result;
  }, [rawProducts, activeDepartment, activeCategory, filters, sortBy, isSaleFilterActive]);

  if (isLoading) return <div className={style.status}>Loading products...</div>;
  if (isError) return <div className={style.status}>Error occurred while loading products</div>;

  return (
    <div className={style.container}>
      <Breadcrumbs
        activeDepartment={activeDepartment}
        activeCategory={activeCategory}
        onResetAll={() => {
          onResetAll();
          setFilters({});
        }}
        onSelectDepartment={(dept) => {
          onSelectDepartment(dept);
          onSelectCategory(null);
        }}
      />

      <FilterBar
        filters={filters}
        onChangeFilters={setFilters}
        sortBy={sortBy}
        onChangeSort={setSortBy}
        availableOptions={availableOptions}
      />

      {filteredProducts.length === 0 ? (
        <div className={style.status}>No products found...</div>
      ) : (
        <div className={style.grid}>
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}