import { createSlice } from '@reduxjs/toolkit';
import { loginSuccess, logout } from './authSlice';

const getUserId = () => {
  const user = JSON.parse(localStorage.getItem('currentUser'));
  return user?.id || null;
};

const loadCart = () => {
  const userId = getUserId();
  if (!userId) return [];
  const data = localStorage.getItem(`cart_${userId}`);
  return data ? JSON.parse(data) : [];
};

const saveCart = (items) => {
  const userId = getUserId();
  if (userId) {
    localStorage.setItem(`cart_${userId}`, JSON.stringify(items));
  }
};

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: loadCart(),
  },
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload;
      const exists = state.items.some((item) => item.id === product.id);
      if (!exists) {
        state.items.push(product);
        saveCart(state.items);
      }
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
      saveCart(state.items);
    },
    clearCart: (state) => {
      state.items = [];
      saveCart(state.items);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginSuccess, (state, action) => {
        const userId = action.payload.id;
        const data = localStorage.getItem(`cart_${userId}`);
        state.items = data ? JSON.parse(data) : [];
      })
      .addCase(logout, (state) => {
        state.items = [];
      });
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export const selectCartItems = (state) => state.cart.items;
export const selectCartCount = (state) => state.cart.items.length;

export default cartSlice.reducer;