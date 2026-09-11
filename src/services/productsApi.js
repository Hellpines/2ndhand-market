import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { CATEGORY_TREE } from '../constants/categories';

export const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://dummyjson.com/' }),
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: ({ category, department } = {}) => {
        if (department === 'new') {
          return 'products?sortBy=id&order=desc&limit=12';
        }
        if (category && category !== 'all') {
          return `products/category/${category}`;
        }
        return 'products';
      },
    }),
    getCategoriesTree: builder.query({
      query: () => 'products/category-list',
      transformResponse: (rawCategories) => {
        const assignedSlugs = new Set(CATEGORY_TREE.flatMap((group) => group.slugs));
        const unassigned = rawCategories.filter(
          (cat) => !assignedSlugs.has(typeof cat === 'string' ? cat : cat.slug)
        );

        return [
          ...CATEGORY_TREE,
          ...(unassigned.length > 0
            ? [
                {
                  title: 'Other',
                  slugs: unassigned.map((c) => (typeof c === 'string' ? c : c.slug)),
                },
              ]
            : []),
        ];
      },
    }),
    getProductById: builder.query({
      query: (id) => `products/${id}`,
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetCategoriesTreeQuery,
  useGetProductByIdQuery,
} = productsApi;