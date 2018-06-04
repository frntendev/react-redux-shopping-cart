import fetch from "isomorphic-fetch";
import * as Actions from "../constants";

export const getProductInfo = () => dispatch => {
  dispatch(productsFetching());
  return fetch("https://private-3efa8-products123.apiary-mock.com/products")
    .then(res => {
      if (res.status !== 200) dispatch(productsFetchFailed("error"));
      else return res.json();
    })
    .then(res => {
      if (res) dispatch(productsFetched(res));
    })
    .catch(err => {
      dispatch(productsFetchFailed(err));
    });
};

export const productsFetching = () => ({
  type: Actions.PRODUCT_INFO_FETCHING
});

export const productsFetched = res => ({
  type: Actions.PRODUCT_INFO_FETCHED,
  payload: res
});

export const productsFetchFailed = err => ({
  type: Actions.PRODUCT_INFO_FAILED,
  payload: err
});
