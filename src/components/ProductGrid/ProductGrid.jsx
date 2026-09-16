import { useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useGetProductsQuery } from '../../services/productsApi';
import ProductCard from '../ProductCard/ProductCard';
import FilterBar from '../FilterBar/FilterBar';
import Breadcrumbs from '../Breadcrumbs/Breadcrumbs';
import { filterProducts } from '../../helpers/filterProducts';
import { selectFilters, resetAllFilters } from '../../store/slices/filterSlice';
import style from './ProductGrid.module.css';

export default function ProductGrid({
  activeDepartment,
  activeCategory,
  onSelectDepartment,
  onSelectCategory,
  onResetAll,
}) {
  const dispatch = useDispatch();
  const { data, isLoading, isError } = useGetProductsQuery();

  const filters = useSelector(selectFilters);
  const [sortBy, setSortBy] = useState(null);

  const rawProducts = data?.products || [];

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

    if (filters.isSale) {
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
  }, [rawProducts, activeDepartment, activeCategory, filters.isSale]);

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

    result = filterProducts(result, filters);

    if (sortBy === 'asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'desc') {
      result.sort((a, b) => b.price - a.price);
    }

    return result;
  }, [rawProducts, activeDepartment, activeCategory, filters, sortBy]);

  if (isLoading) return <div className={style.status}>Loading products...</div>;
  if (isError) return <div className={style.status}>Error occurred while loading products</div>;

  return (
    <div className={style.container}>
      <Breadcrumbs
        activeDepartment={activeDepartment}
        activeCategory={activeCategory}
        onResetAll={() => {
          onResetAll();
          dispatch(resetAllFilters());
        }}
        onSelectDepartment={(dept) => {
          onSelectDepartment(dept);
          onSelectCategory(null);
        }}
      />

      <FilterBar
        filters={filters}
        sortBy={sortBy}
        onChangeSort={setSortBy}
        availableOptions={availableOptions}
        activeCategory={activeCategory}
        onSelectCategory={onSelectCategory}
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