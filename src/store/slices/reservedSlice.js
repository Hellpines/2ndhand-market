import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  reservedShops: [],
};

const reservedSlice = createSlice({
  name: 'reserved',
  initialState,
  reducers: {
    addToReserved: (state, action) => {
      const product = action.payload;
      const shopName = product.shop || 'Unknown Shop';

      let shopGroup = state.reservedShops.find((group) => group.shopName === shopName);

      if (!shopGroup) {
        const now = new Date();
        const until = new Date(now.getTime() + 48 * 60 * 60 * 1000);
        
        shopGroup = {
          shopId: product.shopId || shopName.toLowerCase().replace(/\s+/g, '-'),
          shopName: shopName,
          location: product.location || '23A Gran Via',
          workHours: product.workHours || 'MO - FR: 9AM - 8PM | SA - SU: 9AM - 8PM',
          reservedTime: `${now.toLocaleDateString()} - ${until.toLocaleDateString()}`,
          items: [],
        };
        state.reservedShops.push(shopGroup);
      }

      const exists = shopGroup.items.some((item) => item.id === product.id);
      if (!exists) {
        shopGroup.items.push(product);
      }
    },
    removeFromReserved: (state, action) => {
      const { shopId, productId } = action.payload;
      const shopGroup = state.reservedShops.find((g) => g.shopId === shopId);
      if (shopGroup) {
        shopGroup.items = shopGroup.items.filter((item) => item.id !== productId);
        if (shopGroup.items.length === 0) {
          state.reservedShops = state.reservedShops.filter((g) => g.shopId !== shopId);
        }
      }
    },
  },
});

export const { addToReserved, removeFromReserved } = reservedSlice.actions;
export const selectReservedShops = (state) => state.reserved?.reservedShops || [];
export default reservedSlice.reducer;