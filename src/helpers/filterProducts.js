export const filterProducts = (products = [], filters = {}) => {
  return products.filter((product) => {
    const matchColor =
      !filters.colors?.length || filters.colors.includes(product.color);

    const matchSize =
      !filters.sizes?.length ||
      (Array.isArray(product.size)
        ? product.size.some((s) => filters.sizes.map(String).includes(String(s)))
        : filters.sizes.map(String).includes(String(product.size)));

    const matchBrand =
      !filters.brands?.length || filters.brands.includes(product.brand);

    const matchCondition =
      !filters.conditions?.length || filters.conditions.includes(product.condition);

    const matchShop =
      !filters.shops?.length || filters.shops.includes(product.shop);

    const matchSale =
      !filters.isSale || Boolean(product.isSale || product.isOnSale || product.oldPrice);

    return (
      matchColor &&
      matchSize &&
      matchBrand &&
      matchCondition &&
      matchShop &&
      matchSale
    );
  });
};