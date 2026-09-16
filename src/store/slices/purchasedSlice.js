import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  purchasedOrders: [],
};

const purchasedSlice = createSlice({
  name: 'purchased',
  initialState,
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
    },
  },
});

export const { addPurchasedOrder } = purchasedSlice.actions;
export const selectPurchasedOrders = (state) => state.purchased?.purchasedOrders || [];
export default purchasedSlice.reducer;