import thunk from "redux-thunk";
import configureStore from "redux-mock-store";
import * as Actions from "../constants";
import { destroyItem, removeFromCart, addToCart } from "./cartActions";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

// You would import the action from your codebase in a real scenario
describe("Cart Actions", () => {
  const initialState = {
    productInfo: {
      result: {
        products: [
          {
            productID: 4,
            name: "Chef Anton's Cajun Seasoning",
            description: "",
            unitPrice: 22,
            unitsInStock: 52,
            image: "http://lorempixel.com/400/200/technics/"
          },
          {
            productID: 5,
            name: "Chef Anton's Gumbo Mix",
            description: "",
            unitPrice: 21.35,
            unitsInStock: 0,
            image: "http://lorempixel.com/400/200/technics/"
          },
          {
            productID: 6,
            name: "Grandma's Boysenberry Spread",
            description: "",
            unitPrice: 25,
            unitsInStock: 117,
            image: "http://lorempixel.com/400/200/technics/"
          }
        ]
      }
    }
  };
  const store = mockStore(initialState);

  describe("Add to cart", () => {
    it("should add an item to the cart", () => {
      store.clearActions();
      store.getState(store.dispatch(addToCart(4)));
      const expectedPayload = {
        type: Actions.CARD_ADD,
        payload: 4
      };
      const actions = store.getActions();
      expect(actions).toEqual([expectedPayload]);
    });

    it("should not add an item to the cart because the quantity is 0", () => {
      store.clearActions();
      store.getState(store.dispatch(addToCart(5)));
      const expectedPayload = {
        type: Actions.CARD_ADD,
        payload: 5
      };
      const actions = store.getActions();
      expect(actions).not.toEqual([expectedPayload]);
    });
  });

  describe("Remove from cart", () => {
    const cartRemove = removeFromCart;
    it("should dispatch cart remove action", () => {
      store.clearActions();
      store.dispatch(cartRemove(1));
      const expectedPayload = { payload: 1, type: Actions.CARD_REMOVE };
      const actions = store.getActions();
      expect(actions).toEqual([expectedPayload]);
    });

    it("should dispatch cart remove action with product id", () => {
      store.clearActions();
      store.dispatch(cartRemove(2));
      const expectedPayload = { payload: 2, type: Actions.CARD_REMOVE };
      const actions = store.getActions();
      expect(actions).toEqual([expectedPayload]);
    });
  });

  describe("Destory item in cart", () => {
    it("should dispatch cart remove action", () => {
      store.clearActions();
      store.dispatch(destroyItem(1, 2));
      const expectedPayload = {
        type: Actions.CARD_DESTROY_ITEM,
        payload: {
          productId: 1,
          quantity: 2
        }
      };
      const actions = store.getActions();
      expect(actions).toEqual([expectedPayload]);
    });
  });
});
