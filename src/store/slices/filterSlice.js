import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  colors: [],
  sizes: [],
  brands: [],
  conditions: [],
  shops: [],
  price: { min: null, max: null },
};

const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    toggleFilterValue: (state, action) => {
      const { category, value } = action.payload;
      const index = state[category].indexOf(value);

      if (index === -1) {
        state[category].push(value);
      } else {
        state[category].splice(index, 1);
      }
    },
    clearFilterCategory: (state, action) => {
      const category = action.payload;
      state[category] = [];
    },
    resetAllFilters: () => initialState,
  },
});

export const { toggleFilterValue, clearFilterCategory, resetAllFilters } = filterSlice.actions;
export const selectFilters = (state) => state.filters;
export default filterSlice.reducer;