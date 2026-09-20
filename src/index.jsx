import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import App from './App';
import MyItemsPage from './pages/MyItemsPage/MyItemsPage';
import WishListPage from './pages/WishListPage/WishListPage';
import AboutUsPage from './pages/AboutUsPage/AboutUsPage';
import SignInPage from './pages/Auth/SignInPage';
import SignUpPage from './pages/Auth/SignUpPage';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import { store } from './store';
import ShopsPage from './pages/ShopsPage/ShopsPage';
import MerchantPage from './pages/MerchantPage/MerchantPage';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
    <Provider store={store}>
        <BrowserRouter>
            <Routes>
                <Route element={<App />} path='/'/>
                <Route element={<MyItemsPage />} path='/my-items'/>
                <Route element={<WishListPage />} path='/wish-list'/>
                <Route element={<AboutUsPage />} path='/about-us'/>
                <Route element={<SignInPage />} path='/login'/>
                <Route element={<SignUpPage />} path='/signup'/>
                <Route element={<ProfilePage />} path='/profile'/>
                <Route element={<ShopsPage />} path='/shops'/>
                <Route element={<MerchantPage />} path='/merchant'/>
            </Routes>
        </BrowserRouter>
    </Provider>
);