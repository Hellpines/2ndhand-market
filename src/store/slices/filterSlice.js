import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  search: '',
  colors: [],
  sizes: [],
  brands: [],
  conditions: [],
  shops: [],
  isSale: false,
};

const KEY_MAP = {
  brand: 'brands',
  color: 'colors',
  size: 'sizes',
  shop: 'shops',
  condition: 'conditions',
};

const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setSearchQuery: (state, action) => {
      state.search = action.payload;
    },
    toggleFilterValue: (state, action) => {
      const payload = action.payload || {};
      const category = payload.category || payload.key;
      const value = payload.value;

      if (!category) return;

      const targetKey = KEY_MAP[category] || category;

      if (payload.clear) {
        if (Array.isArray(state[targetKey])) {
          state[targetKey] = [];
        } else if (typeof state[targetKey] === 'boolean') {
          state[targetKey] = false;
        }
        return;
      }

      if (typeof state[targetKey] === 'boolean') {
        state[targetKey] = !state[targetKey];
        return;
      }

      if (Array.isArray(state[targetKey])) {
        if (value === undefined) {
          state[targetKey] = [];
          return;
        }

        const index = state[targetKey].indexOf(value);
        if (index === -1) {
          state[targetKey].push(value);
        } else {
          state[targetKey].splice(index, 1);
        }
      }
    },
    clearFilterCategory: (state, action) => {
      const category = action.payload;
      const targetKey = KEY_MAP[category] || category;
      if (Array.isArray(state[targetKey])) {
        state[targetKey] = [];
      }
    },
    resetAllFilters: () => initialState,
  },
});

export const { setSearchQuery, toggleFilterValue, clearFilterCategory, resetAllFilters } =
  filterSlice.actions;

export const selectFilters = (state) => {
  const f = state.filters || initialState;
  return {
    ...f,
    brand: f.brands,
    color: f.colors,
    size: f.sizes,
    shop: f.shops,
    condition: f.conditions,
  };
};

export const selectSearchQuery = (state) => state.filters?.search || '';

export default filterSlice.reducer;