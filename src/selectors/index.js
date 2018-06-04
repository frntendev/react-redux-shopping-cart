import _ from "lodash";
import { createSelector } from "reselect";

const getCart = state => state.cart;
const getProducts = state =>
  state.productInfo.result && state.productInfo.result.products;

export const getCartItems = createSelector(
  [getCart, getProducts],
  (cart, products) => {
    let cartItem = {};
    const cartItems = [];
    const productsById = _.keyBy(products, "productID");
    Object.keys(cart).map(item => {
      cartItem = productsById[item];
      cartItem.quantity = cart[item];
      return cartItems.push(cartItem);
    });
    return cartItems;
  }
);

export const getTotalPrice = createSelector([getCartItems], items => {
  let total = 0;
  items.map(item => {
    return (total += item.quantity * item.unitPrice);
  });
  return total;
});
