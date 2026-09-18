import { createSlice } from '@reduxjs/toolkit';
import { loginSuccess, logout } from './authSlice';

const getUserId = () => {
  const user = JSON.parse(localStorage.getItem('currentUser'));
  return user?.id || null;
};

const loadReserved = () => {
  const userId = getUserId();
  if (!userId) return [];
  const data = localStorage.getItem(`reserved_${userId}`);
  return data ? JSON.parse(data) : [];
};

const saveReserved = (shops) => {
  const userId = getUserId();
  if (userId) {
    localStorage.setItem(`reserved_${userId}`, JSON.stringify(shops));
  }
};

const reservedSlice = createSlice({
  name: 'reserved',
  initialState: {
    reservedShops: loadReserved(),
  },
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
      saveReserved(state.reservedShops);
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
      saveReserved(state.reservedShops);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginSuccess, (state, action) => {
        const userId = action.payload.id;
        const data = localStorage.getItem(`reserved_${userId}`);
        state.reservedShops = data ? JSON.parse(data) : [];
      })
      .addCase(logout, (state) => {
        state.reservedShops = [];
      });
  },
});

export const { addToReserved, removeFromReserved } = reservedSlice.actions;
export const selectReservedShops = (state) => state.reserved?.reservedShops || [];

export default reservedSlice.reducer;