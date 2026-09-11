import style from './App.module.css';
import Departments from './components/Departments/Departments';
import Header from './components/Header/Header';
import Sidebar from './components/Sidebar/Sidebar';

export default function App() {
  return (
    <>
      <Header />
      <Departments />
      <main className={style.main}>
        <Sidebar />
        <section className={style.content}>
        </section>
      </main>
    </>
  );
}