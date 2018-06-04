import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";
import cart from "./cartReducer";
import productInfo from "./productsReducer";

export default combineReducers({
  routing: routerReducer,
  cart,
  productInfo
});
