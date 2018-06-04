import cart from "./cartReducer";
import { getCartItems, getTotalPrice } from "../selectors";

describe("reducers", () => {
  describe("cart", () => {
    const initialState = {
      cart: {}
    };

    const state = {
      cart: { "4": 1, "6": 3 },
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

    it("should provide the initial state", () => {
      expect(cart(undefined, {})).toEqual(initialState.cart);
    });

    it("should handle CARD_ADD action", () => {
      expect(cart({}, { type: "CARD_ADD", payload: 1 })).toEqual({ 1: 1 });
      expect(cart({ 1: 1 }, { type: "CARD_ADD", payload: 1 })).toEqual({
        1: 2
      });
      expect(cart({ 1: 2, 5: 4 }, { type: "CARD_ADD", payload: 1 })).toEqual({
        1: 3,
        5: 4
      });
    });

    it("should handle CARD_REMOVE action", () => {
      expect(cart({ 1: 1 }, { type: "CARD_REMOVE", payload: 1 })).toEqual({
        1: 0
      });
      expect(cart({ 1: 4, 4: 5 }, { type: "CARD_REMOVE", payload: 4 })).toEqual(
        {
          1: 4,
          4: 4
        }
      );
    });

    it("should handle CARD_DESTROY_ITEM action", () => {
      expect(
        cart(
          { 1: 10 },
          { type: "CARD_DESTROY_ITEM", payload: { productId: 1 } }
        )
      ).toEqual({});
      expect(
        cart(
          { 1: 10, 5: 8 },
          { type: "CARD_DESTROY_ITEM", payload: { productId: 5 } }
        )
      ).toEqual({ 1: 10 });
    });
  });
});
