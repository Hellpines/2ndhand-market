import { createSlice } from '@reduxjs/toolkit';
import { loginSuccess, logout } from './authSlice';

const getUserId = () => {
  const user = JSON.parse(localStorage.getItem('currentUser'));
  return user?.id || null;
};

const loadPurchased = () => {
  const userId = getUserId();
  if (!userId) return [];
  const data = localStorage.getItem(`purchased_${userId}`);
  return data ? JSON.parse(data) : [];
};

const savePurchased = (orders) => {
  const userId = getUserId();
  if (userId) {
    localStorage.setItem(`purchased_${userId}`, JSON.stringify(orders));
  }
};

const purchasedSlice = createSlice({
  name: 'purchased',
  initialState: {
    purchasedOrders: loadPurchased(),
  },
  reducers: {
    addPurchasedOrder: (state, action) => {
      const newOrder = {
        orderId: `ORD-${Date.now()}`,
        purchaseDate: new Date().toLocaleDateString('en-GB', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
        }),
        ...action.payload,
      };
      state.purchasedOrders.unshift(newOrder);
      savePurchased(state.purchasedOrders);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginSuccess, (state, action) => {
        const userId = action.payload.id;
        const data = localStorage.getItem(`purchased_${userId}`);
        state.purchasedOrders = data ? JSON.parse(data) : [];
      })
      .addCase(logout, (state) => {
        state.purchasedOrders = [];
      });
  },
});

export const { addPurchasedOrder } = purchasedSlice.actions;
export const selectPurchasedOrders = (state) => state.purchased?.purchasedOrders || [];

export default purchasedSlice.reducer;