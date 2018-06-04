import React from "react";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { css } from "react-emotion";
import { getProductInfo, addToCart } from "../../../actions";
import * as Actions from "../../../constants";
import Product from "../components/Product";
import Skeleton from "../components/Skeleton";

const styles = {
  root: css`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 20px;
    justify-content: center;
    label: home-page-root;
    @media (max-width: 768px) {
      grid-template-columns: 1fr 1fr;
    }
    @media (max-width: 400px) {
      grid-template-columns: 1fr;
    }
  `,
  input: css`
    height: 40px;
    width: 100%;
    font-size: 1.2rem;
    padding-left: 10px;
    border-radius: 2px;
    border: none;
    outline: none;
    font-family: "PT Sans", sans-serif;
    box-sizing: border-box;
    background: #aaaaaa29;
  `
};

class HomePage extends React.Component {
  state = { searchTerm: "" };

  handleInputChange = event => {
    this.setState({
      searchTerm: event.target.value
    });
  };

  componentDidMount = () => {
    if (this.props.productInfo.readyState !== Actions.PRODUCT_INFO_FETCHED)
      this.props.getProductInfo();
  };

  render() {
    const props = this.props;
    return [
      <input
        key="search-input"
        className={styles.input}
        type="text"
        placeholder="Search..."
        value={this.state.searchTerm}
        onChange={this.handleInputChange}
      />,
      <div key="products" className={styles.root}>
        {props.productInfo.readyState === Actions.PRODUCT_INFO_FETCHED &&
          props.productInfo.result.products
            .filter(
              s =>
                this.state.searchTerm === "" ||
                s.name
                  .toLowerCase()
                  .includes(this.state.searchTerm.toLowerCase())
            )
            .map((item, index) => {
              return (
                <Product
                  key={index}
                  name={item.name}
                  image={item.image}
                  price={item.unitPrice}
                  unitsInStock={item.unitsInStock}
                  onClick={() => props.addToCart(item.productID)}
                />
              );
            })}
        {props.productInfo.readyState === Actions.PRODUCT_INFO_FETCHING && [
          <Skeleton key="prealoader1" />,
          <Skeleton key="prealoader2" />,
          <Skeleton key="prealoader3" />
        ]}
        {props.productInfo.readyState === Actions.PRODUCT_INFO_FAILED && (
          <div>Something is wrong please try again</div>
        )}
      </div>
    ];
  }
}

const mapStateToProps = state => ({
  productInfo: state.productInfo
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getProductInfo,
      addToCart
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);

HomePage.propTypes = {
  getProductInfo: PropTypes.func,
  addToCart: PropTypes.func,
  productInfo: PropTypes.object
};
