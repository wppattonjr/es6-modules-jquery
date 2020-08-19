const cart = [];

const setCart = (book) => {
  cart.push(book);
};

const getCart = () => {
  return cart;
};

const emptyCart = () => {
  cart.length = 0;
};

export { setCart, getCart, emptyCart }
