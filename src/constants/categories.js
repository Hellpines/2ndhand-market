export const DEPARTMENT_MAP = {
  women: [
    'womens-dresses',
    'womens-shoes',
    'womens-bags',
    'womens-jewellery',
    'womens-watches',
    'tops',
    'jackets',
  ],
  men: [
    'mens-shirts',
    'mens-shoes',
    'mens-watches',
    'belts',
    'jackets',
  ],
  unisex: [
    'jackets',
    'sunglasses',
    'backpacks',
    'tops',
  ],
  children: [
    'kids-wear',
    'kids-shoes',
  ],
  new: [
    'jackets',
    'womens-dresses',
    'mens-shirts',
    'womens-bags',
    'backpacks',
    'tops',
    'womens-jewellery',
    'sunglasses',
    'mens-shoes',
    'belts',
    'kids-wear',
    'kids-shoes',
  ],
};

export const CATEGORY_TREE = [
  {
    title: 'Apparel',
    subcategories: [
      {
        title: 'Clothes',
        items: [
          { label: 'Womens Dresses', slug: 'womens-dresses' },
          { label: 'Mens Shirts', slug: 'mens-shirts' },
          { label: 'Tops', slug: 'tops' },
          { label: 'Jackets', slug: 'jackets' },
          { label: 'Kids Wear', slug: 'kids-wear' },
        ],
      },
    ],
  },
  {
    title: 'Shoes',
    subcategories: [
      {
        title: 'Footwear',
        items: [
          { label: 'Womens Shoes', slug: 'womens-shoes' },
          { label: 'Mens Shoes', slug: 'mens-shoes' },
          { label: 'Kids Shoes', slug: 'kids-shoes' },
        ],
      },
    ],
  },
  {
    title: 'Accessories',
    subcategories: [
      {
        title: 'Watches & Jewellery',
        items: [
          { label: 'Womens Jewellery', slug: 'womens-jewellery' },
          { label: 'Mens Watches', slug: 'mens-watches' },
          { label: 'Womens Watches', slug: 'womens-watches' },
        ],
      },
      {
        title: 'Bags & Optics',
        items: [
          { label: 'Womens Bags', slug: 'womens-bags' },
          { label: 'Backpacks', slug: 'backpacks' },
          { label: 'Sunglasses', slug: 'sunglasses' },
          { label: 'Belts', slug: 'belts' },
        ],
      },
    ],
  },
];

export const getDepartmentBySlug = (slug) => {
  for (const [dept, slugs] of Object.entries(DEPARTMENT_MAP)) {
    if (dept !== 'new' && Array.isArray(slugs) && slugs.includes(slug)) {
      return dept;
    }
  }
  return 'women';
};