import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { CATEGORY_TREE } from '../constants/categories';

export const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://dummyjson.com/' }),
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => 'c/a0f7-c6a7-4ef9-a12e',
    }),

    getCategoriesTree: builder.query({
      query: () => 'c/a0f7-c6a7-4ef9-a12e',
      transformResponse: () => CATEGORY_TREE,
    }),

    getProductById: builder.query({
      query: () => 'c/a0f7-c6a7-4ef9-a12e',
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