export const persistMiddleware = (store) => (next) => (action) => {
  const result = next(action);
  const state = store.getState();
  const user = state.auth?.user;
  const userId = user?.id;

  if (user) {
    localStorage.setItem('currentUser', JSON.stringify(user));
  } else {
    localStorage.removeItem('currentUser');
  }

  if (userId) {
    localStorage.setItem(`cart_${userId}`, JSON.stringify(state.cart?.items || []));
    localStorage.setItem(
      `favorites_${userId}`,
      JSON.stringify(state.favorites?.items || [])
    );
    localStorage.setItem(
      `purchased_${userId}`,
      JSON.stringify(state.purchased?.purchasedOrders || [])
    );
    localStorage.setItem(
      `reserved_${userId}`,
      JSON.stringify(state.reserved?.reservedShops || [])
    );
  }

  return result;
};
