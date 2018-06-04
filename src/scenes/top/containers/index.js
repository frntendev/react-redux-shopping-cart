import React from "react";
import PropTypes from "prop-types";
import { css } from "react-emotion";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { getProductInfo, addToCart } from "../../../actions";
import Product from "../../home/components/Product";
import Skeleton from "../../home/components/Skeleton";

const styles = {
  root: css`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 20px;
    justify-content: center;
    label: top-page-root;
    @media (max-width: 768px) {
      grid-template-columns: 1fr 1fr;
    }
    @media (max-width: 400px) {
      grid-template-columns: 1fr;
    }
  `
};

class TopPage extends React.Component {
  componentDidMount = () => {
    if (this.props.productInfo.readyState !== "PRODUCT_INFO_FETCHED")
      this.props.getProductInfo();
  };

  render() {
    const props = this.props;
    return (
      <div className={styles.root}>
        {props.productInfo.readyState === "PRODUCT_INFO_FETCHED" &&
          props.productInfo.result.products
            .slice(
              0,
              props.productInfo.result.products.length > 5
                ? 5
                : props.productInfo.result.products.length
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
        {props.productInfo.readyState === "PRODUCT_INFO_FETCHING" && [
          <Skeleton key="prealoader1" />,
          <Skeleton key="prealoader2" />,
          <Skeleton key="prealoader3" />
        ]}
        {props.productInfo.readyState === "PRODUCT_INFO_FAILED" && (
          <div>Something is wrong please try again</div>
        )}
      </div>
    );
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

export default connect(mapStateToProps, mapDispatchToProps)(TopPage);

TopPage.propTypes = {
  getProductInfo: PropTypes.func,
  addToCart: PropTypes.func,
  productInfo: PropTypes.object
};
