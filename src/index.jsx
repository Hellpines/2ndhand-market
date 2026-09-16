import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import MyItemsPage from './pages/MyItemsPage/MyItemsPage';
import WishListPage from './pages/WishListPage/WishListPage';
import { Provider } from 'react-redux';
import { store } from './store';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
    <Provider store={store}>
        <BrowserRouter>
            <Routes>
                <Route element={<App />} path='/'/>
                <Route element={<MyItemsPage />} path='/my-items'/>
                <Route element={<WishListPage />} path='/wish-list'/>
            </Routes>
        </BrowserRouter>
    </Provider>
);