import { useState } from 'react';
import style from './App.module.css';
import Departments from './components/Departments/Departments';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import ProductGrid from './components/ProductGrid/ProductGrid';
import Sidebar from './components/Sidebar/Sidebar';

export default function App() {
  const [activeDepartment, setActiveDepartment] = useState('women');
  const [activeCategory, setActiveCategory] = useState('all');

  const handleSelectDepartment = (deptId) => {
    setActiveDepartment(deptId);
    setActiveCategory('all');
  };

  const handleSelectCategory = (slug) => {
    if (activeCategory === slug) {
      setActiveCategory('all');
    } else {
      setActiveCategory(slug);
      if (activeDepartment === 'new') {
        setActiveDepartment(null);
      }
    }
  };

  return (
    <>
      <Header />
      <Departments
        activeDepartment={activeDepartment}
        onSelectDepartment={handleSelectDepartment}
      />
      <main className={style.main}>
        <Sidebar
          activeDepartment={activeDepartment}
          activeCategory={activeCategory}
          onSelectCategory={handleSelectCategory}
        />
        <section className={style.content}>
          <ProductGrid
            activeDepartment={activeDepartment}
            activeCategory={activeCategory}
          />
        </section>
      </main>
      <Footer />
    </>
  );
}