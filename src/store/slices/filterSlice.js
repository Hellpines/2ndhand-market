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

const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setSearchQuery: (state, action) => {
      state.search = action.payload;
    },
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

export const { setSearchQuery, toggleFilterValue, clearFilterCategory, resetAllFilters } =
  filterSlice.actions;
export const selectFilters = (state) => state.filters || initialState;
export const selectSearchQuery = (state) => state.filters?.search || '';

export default filterSlice.reducer;