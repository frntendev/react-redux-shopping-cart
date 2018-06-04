import React from "react";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { css } from "react-emotion";
import { addToCart, removeFromCart, destroyItem } from "../../../actions";
import { getCartItems, getTotalPrice } from "../../../selectors";
import CartItem from "../components/CartItem";

const styles = {
  total: css`
    font-size: 2.5rem;
    text-align: right;
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 60px;
    line-height: 60px;
    background: white;
    box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.2),
      0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 3px 1px -2px rgba(0, 0, 0, 0.12);
    label: total;
  `,
  container: css`
    max-width: 960px;
    margin: 0 auto;
    height: 100%;
    padding-right: 5px;
    label: total-container;
  `
};

const CartPage = ({ cart, total, increaseItem, decreaseItem, destroyItem }) => {
  return (
    <div>
      <h1>Cart</h1>
      <div>
        {cart.map((item, index) => {
          return (
            <CartItem
              key={`cart-item-${index}`}
              name={item.name}
              itemsLeft={item.unitsInStock}
              image={item.image}
              price={item.unitPrice}
              quantity={item.quantity}
              increaseItem={() => increaseItem(item.productID)}
              decreaseItem={() => decreaseItem(item.productID)}
              destroyItem={() => destroyItem(item.productID, item.quantity)}
            />
          );
        })}
        {cart.length > 0 ? (
          <div className={styles.total}>
            <div className={styles.container}>
              <span>
                <strong>Total:</strong> ${total}
              </span>
            </div>
          </div>
        ) : (
          <div>You have not added an item to your cart yet</div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  cart: getCartItems(state),
  total: getTotalPrice(state)
});
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      increaseItem: addToCart,
      decreaseItem: removeFromCart,
      destroyItem
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(CartPage);

CartPage.propTypes = {
  cart: PropTypes.arrayOf(PropTypes.object),
  total: PropTypes.number,
  decreaseItem: PropTypes.func,
  increaseItem: PropTypes.func,
  destroyItem: PropTypes.func
};
