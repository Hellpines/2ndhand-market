import { useGetProductsQuery } from '../../services/productsApi';
import ProductCard from '../ProductCard/ProductCard';
import style from './ProductGrid.module.css';

export default function ProductGrid({ activeDepartment, activeCategory }) {
  const { data, isLoading, isError } = useGetProductsQuery();

  if (isLoading) return <div className={style.status}>Загрузка товаров...</div>;
  if (isError) return <div className={style.status}>Ошибка при загрузке товаров</div>;

  let products = data?.products || [];

  if (activeDepartment) {
    if (activeDepartment === 'new') {
      products = products.filter((product) => product.isNew === true);
    } else {
      products = products.filter((product) => product.department === activeDepartment);
    }
  }

  if (activeCategory && activeCategory !== 'all') {
    products = products.filter((product) => product.category === activeCategory);
  }

  if (products.length === 0) {
    return <div className={style.status}>Товары не найдены</div>;
  }

  return (
    <div className={style.grid}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}