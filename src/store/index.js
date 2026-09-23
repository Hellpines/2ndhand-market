import { configureStore } from '@reduxjs/toolkit';
import filterReducer from './slices/filterSlice';
import purchasedReducer from './slices/purchasedSlice';
import reservedReducer from './slices/reservedSlice';
import favoritesReducer from './slices/favoritesSlice';
import cartReducer from './slices/cartSlice';
import authReducer from './slices/authSlice';
import { productsApi } from '../services/productsApi';
import { persistMiddleware } from './middleware/persistMiddleware';

export const store = configureStore({
  reducer: {
    purchased: purchasedReducer,
    reserved: reservedReducer,
    filters: filterReducer,
    favorites: favoritesReducer,
    cart: cartReducer,
    auth: authReducer,
    [productsApi.reducerPath]: productsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productsApi.middleware, persistMiddleware),
});