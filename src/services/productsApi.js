import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { CATEGORY_TREE } from '../constants/categories';

export const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://dummyjson.com/' }),
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => 'c/a6d0-64b2-4f6e-b68d',
    }),

    getCategoriesTree: builder.query({
      query: () => 'c/a6d0-64b2-4f6e-b68d',
      transformResponse: () => CATEGORY_TREE,
    }),

    getProductById: builder.query({
      query: () => 'c/a6d0-64b2-4f6e-b68d',
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