import React from "react";
import PropTypes from "prop-types";
import { css } from "react-emotion";

const styles = {
  root: css`
    display: grid;
    grid-template-columns: 300px auto 50px 50px 160px 100px;
    position: relative;
    grid-gap: 20px;
    min-height: 150px;
    background: #ffffffee;
    padding: 10px;
    box-sizing: border-box;
    align-items: center;
    font-size: 1rem;
    text-align: center;
    margin-bottom: 15px;
    box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.2),
      0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 3px 1px -2px rgba(0, 0, 0, 0.12);
    label: cart-item-root;
    @media (max-width: 768px) {
      grid-template-columns: 1fr;
      grid-gap: 20px;
    }
  `,
  image: css`
    width: 100%;
    background: #f7f7f7;
    height: 100%;
    @media (max-width: 768px) {
      height: 160px;
      background: #ddd;
    }
    label: image;
  `,
  removeButton: css`
    outline: none;
    border: none;
    background: transparent;
    cursor: pointer;
    height: 100%;
    border-left: 1px dashed #b7b7b7;
    label: remove-button;
    @media (max-width: 480px) {
      position: absolute;
      width: 45px;
      height: 45px;
      top: 15px;
      right: 15px;
      background: #ffffffa3;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      border: none;
    }
  `,
  removeIcon: css`
    width: 30px;
    height: 30px;
    fill: red;
    label: remove-icon;
  `,
  actions: css`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    label: actions;
  `,
  actionButton: css`
    font-size: 1rem;
    border: 1px solid #d2d2d2;
    border-radius: 2px;
    display: flex;
    justify-content: center;
    align-items: center;
    outline: none;
    cursor: pointer;
    transition: 0.3s all ease;
    label: action-button;
    &:hover {
      background: #f1f1f1;
    }
    &:disabled {
      cursor: not-allowed;
    }
  `
};

const CartItem = props => {
  return (
    <div className={styles.root}>
      <img className={styles.image} src={props.image} alt={props.name} />
      <strong>{props.name}</strong>
      <span>Left: {props.itemsLeft}</span>
      <span>${props.price}</span>
      <div className={styles.actions}>
        <button
          disabled={props.quantity <= 1}
          className={styles.actionButton}
          onClick={props.decreaseItem}
        >
          -
        </button>
        <span>No: {props.quantity}</span>
        <button
          disabled={props.itemsLeft === 0}
          className={styles.actionButton}
          onClick={props.increaseItem}
        >
          +
        </button>
      </div>
      <button className={styles.removeButton} onClick={props.destroyItem}>
        <svg className={styles.removeIcon} viewBox="0 0 20 20">
          <path d="M10 8.586l-7.071-7.071-1.414 1.414 7.071 7.071-7.071 7.071 1.414 1.414 7.071-7.071 7.071 7.071 1.414-1.414-7.071-7.071 7.071-7.071-1.414-1.414-7.071 7.071z" />
        </svg>
      </button>
    </div>
  );
};

export default CartItem;

CartItem.defaultProps = {
  name: "Product",
  itemsLeft: 0,
  price: 0,
  quantity: 0
};

CartItem.propTypes = {
  image: PropTypes.string,
  name: PropTypes.string.isRequired,
  itemsLeft: PropTypes.number.isRequired,
  price: PropTypes.number.isRequired,
  quantity: PropTypes.number.isRequired,
  decreaseItem: PropTypes.func,
  increaseItem: PropTypes.func,
  destroyItem: PropTypes.func
};
