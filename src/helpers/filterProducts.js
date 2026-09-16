export const filterProducts = (products = [], filters = {}) => {
  return products.filter((product) => {
    const query = filters.search?.trim().toLowerCase();
    const matchSearch =
      !query ||
      product.title?.toLowerCase().includes(query) ||
      product.brand?.toLowerCase().includes(query) ||
      product.description?.toLowerCase().includes(query);

    const matchColor = !filters.colors?.length || filters.colors.includes(product.color);
    const matchSize = !filters.sizes?.length || filters.sizes.includes(product.size);
    const matchBrand = !filters.brands?.length || filters.brands.includes(product.brand);
    const matchCondition = !filters.conditions?.length || filters.conditions.includes(product.condition);
    const matchShop = !filters.shops?.length || filters.shops.includes(product.shop);
    const matchSale = !filters.isSale || Number(product.discountPercentage) > 0;

    return (
      matchSearch &&
      matchColor &&
      matchSize &&
      matchBrand &&
      matchCondition &&
      matchShop &&
      matchSale
    );
  });
};