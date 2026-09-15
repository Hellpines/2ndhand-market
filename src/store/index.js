import { configureStore } from '@reduxjs/toolkit';
import favoritesReducer from './slices/favoritesSlice';
import cartReducer from './slices/cartSlice';
import { productsApi } from '../services/productsApi';

export const store = configureStore({
  reducer: {
    favorites: favoritesReducer,
    cart: cartReducer,
    [productsApi.reducerPath]: productsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productsApi.middleware),
});