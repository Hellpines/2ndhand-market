export const getDepartmentBySlug = (slug) => {
  for (const [dept, slugs] of Object.entries(DEPARTMENT_MAP)) {
    if (dept !== 'new' && Array.isArray(slugs) && slugs.includes(slug)) {
      return dept;
    }
  }
  return 'women';
};

export const DEPARTMENT_MAP = {
  women: [
    'womens-dresses',
    'womens-shoes',
    'womens-bags',
    'womens-jewellery',
    'womens-watches',
    'beauty',
    'skin-care',
    'fragrances',
  ],
  men: [
    'mens-shirts',
    'mens-shoes',
    'mens-watches',
    'sports-accessories',
  ],
  unisex: [
    'smartphones',
    'laptops',
    'tablets',
    'mobile-accessories',
    'furniture',
    'home-decoration',
    'kitchen-accessories',
    'groceries',
    'vehicle',
    'motorcycle',
    'tops',
  ],
  children: [
    'mobile-accessories',
    'sports-accessories',
  ],
  new: 'all',
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
          { label: 'Sunglasses', slug: 'sunglasses' },
        ],
      },
    ],
  },
  {
    title: 'Electronics & Tech',
    subcategories: [
      {
        title: 'Gadgets & Devices',
        items: [
          { label: 'Smartphones', slug: 'smartphones' },
          { label: 'Laptops', slug: 'laptops' },
          { label: 'Tablets', slug: 'tablets' },
          { label: 'Mobile Accessories', slug: 'mobile-accessories' },
        ],
      },
    ],
  },
  {
    title: 'Home & Living',
    subcategories: [
      {
        title: 'Interior & Kitchen',
        items: [
          { label: 'Furniture', slug: 'furniture' },
          { label: 'Home Decoration', slug: 'home-decoration' },
          { label: 'Kitchen Accessories', slug: 'kitchen-accessories' },
          { label: 'Groceries', slug: 'groceries' },
        ],
      },
    ],
  },
  {
    title: 'Vehicles & Sport',
    subcategories: [
      {
        title: 'Transport & Gear',
        items: [
          { label: 'Vehicle', slug: 'vehicle' },
          { label: 'Motorcycle', slug: 'motorcycle' },
          { label: 'Sports Accessories', slug: 'sports-accessories' },
        ],
      },
    ],
  },
  {
    title: 'Beauty',
    subcategories: [
      {
        title: 'Care & Perfume',
        items: [
          { label: 'Beauty', slug: 'beauty' },
          { label: 'Skin Care', slug: 'skin-care' },
          { label: 'Fragrances', slug: 'fragrances' },
        ],
      },
    ],
  },
];