import React from "react";
import PropTypes from "prop-types";
import { css } from "react-emotion";

const styles = props => ({
  root: css`
    display: flex;
    flex-flow: column;
    position: relative;
    max-width: 345px;
    box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.2),
      0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 3px 1px -2px rgba(0, 0, 0, 0.12);
    overflow: hidden;
    padding: 10px;
    border-radius: 2px;
    background-color: #fff;
    transition: 0.3s all ease;
    label: product-root;
  `,
  image: css`
    background-color: #ababab1c;
    background-image: url(${props.image});
    height: 0;
    padding-top: 56.25%;
    display: block;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    label: image;
  `,
  details: css`
    display: grid;
    grid-template-rows: repeat(3, 50px);
    grid-gap: 5px;
    align-items: center;
    margin-top: 30px;
    align-items: center;
    justify-content: center;
    text-align: center;
    label: details;
  `,
  name: css`
    color: rgba(0, 0, 0, 0.87);
    font-size: 1.5rem;
    font-weight: 400;
    line-height: 1.35417em;
    margin: 0;
    display: block;
    label: name;
  `,
  itemsLeft: css`
    color: rgba(0, 0, 0, 0.87);
    font-size: 1rem;
    font-style: italic;
    color: #ababab;
    label: items-left;
  `,
  price: css`
    font-size: 2rem;
    color: #38c538;
    label: price;
  `,
  button: css`
    width: 56px;
    height: 56px;
    padding: 0;
    min-width: 0;
    font-size: 24px;
    box-shadow: 0px 3px 5px -1px rgba(0, 0, 0, 0.2),
      0px 6px 10px 0px rgba(0, 0, 0, 0.14), 0px 1px 18px 0px rgba(0, 0, 0, 0.12);
    border-radius: 50%;
    border: none;
    color: #fff;
    background-color: #2196f3;
    position: absolute;
    right: 10px;
    bottom: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: 0.3s all ease;
    outline: none;
    cursor: pointer;
    label: button;
    &:hover {
      background-color: #1976d2;
    }
    &:disabled {
      background-color: #ababab;
      cursor: not-allowed;
    }
    &:active {
      box-shadow: none;
    }
  `,
  icon: css`
    fill: #fff;
    width: 1em;
    height: 1em;
    display: inline-block;
    font-size: 24px;
    transition: fill 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    user-select: none;
    flex-shrink: 0;
    label: icon;
  `
});
const Product = props => {
  const style = styles(props);
  const s = props.unitsInStock > 1 ? "s" : "";
  return (
    <div className={style.root}>
      <div className={style.image} />
      <div className={style.details}>
        <span className={style.name}>{props.name}</span>
        <span className={style.itemsLeft}>
          {props.unitsInStock} item{s} left
        </span>
        <span className={style.price}>${props.price}</span>
      </div>
      <button
        className={style.button}
        disabled={props.unitsInStock === 0}
        onClick={props.onClick}
      >
        <svg
          className={style.icon}
          focusable="false"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <g>
            <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
          </g>
        </svg>
      </button>
    </div>
  );
};

export default Product;

Product.defaultProps = {
  name: "Product",
  unitsInStock: 0,
  price: 0
};

Product.propTypes = {
  name: PropTypes.string.isRequired,
  unitsInStock: PropTypes.number.isRequired,
  image: PropTypes.string,
  price: PropTypes.number.isRequired,
  onClick: PropTypes.func
};
