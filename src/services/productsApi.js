import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { CATEGORY_TREE } from '../constants/categories';

export const fetchProducts = async () => {
  const response = await fetch('https://dummyjson.com/c/e43c-00fa-4b0f-bf65');

  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }

  return response.json();
};

export const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://dummyjson.com/' }),
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => 'c/e43c-00fa-4b0f-bf65',
    }),

    getCategoriesTree: builder.query({
      query: () => 'c/e43c-00fa-4b0f-bf65',
      transformResponse: () => CATEGORY_TREE,
    }),

    getProductById: builder.query({
      query: () => 'c/e43c-00fa-4b0f-bf65',
      transformResponse: (response, meta, id) => {
        return response.products?.find((item) => String(item.id) === String(id));
      },
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetCategoriesTreeQuery,
  useGetProductByIdQuery,
} = productsApi;