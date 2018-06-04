import products from "./productsReducer";
import * as Actions from "../constants";

describe("reducers", () => {
  describe("product", () => {
    const initialState = {
      readyState: Actions.PRODUCT_INFO_INVALID,
      result: null
    };
    const state = {
      result: {
        products: [
          {
            productID: 4,
            name: "Chef Anton's Cajun Seasoning",
            description: "",
            unitPrice: 22,
            unitsInStock: 53,
            image: "http://lorempixel.com/400/200/technics/"
          },
          {
            productID: 5,
            name: "Chef Anton's Gumbo Mix",
            description: "",
            unitPrice: 21.35,
            unitsInStock: 0,
            image: "http://lorempixel.com/400/200/technics/"
          }
        ]
      }
    };

    it("should provide the initial state", () => {
      expect(products(undefined, {})).toEqual(initialState);
    });

    it("should handle fetching state", () => {
      expect(
        products(initialState, { type: Actions.PRODUCT_INFO_FETCHING })
      ).toEqual({ readyState: Actions.PRODUCT_INFO_FETCHING, result: null });
    });

    it("should handle detch failed state", () => {
      expect(
        products(initialState, { type: Actions.PRODUCT_INFO_FAILED })
      ).toEqual({ readyState: Actions.PRODUCT_INFO_FAILED, result: undefined });
    });

    it("should handle detch failed state", () => {
      expect(
        products(initialState, { type: Actions.PRODUCT_INFO_FETCHED })
      ).toEqual({
        readyState: Actions.PRODUCT_INFO_FETCHED,
        result: undefined
      });
    });

    it("should handle CARD_ADD action", () => {
      expect(products(state, { type: Actions.CARD_ADD, payload: 4 })).toEqual({
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
            }
          ]
        }
      });
    });

    it("should handle CARD_ADD action when the product doesn't exist", () => {
      expect(products(state, { type: Actions.CARD_ADD, payload: 12 })).toEqual(
        state
      );
    });

    it("should handle CARD_REMOVE action", () => {
      expect(
        products(state, { type: Actions.CARD_REMOVE, payload: 5 })
      ).toEqual({
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
              unitsInStock: 1,
              image: "http://lorempixel.com/400/200/technics/"
            }
          ]
        }
      });
    });

    it("should handle CARD_REMOVE action when the product doesn't exist", () => {
      expect(
        products(state, { type: Actions.CARD_REMOVE, payload: 12 })
      ).toEqual(state);
    });

    it("should handle CARD_DESTROY_ITEM action", () => {
      expect(
        products(state, {
          type: Actions.CARD_DESTROY_ITEM,
          payload: { productId: 4, quantity: 4 }
        })
      ).toEqual({
        result: {
          products: [
            {
              productID: 4,
              name: "Chef Anton's Cajun Seasoning",
              description: "",
              unitPrice: 22,
              unitsInStock: 56,
              image: "http://lorempixel.com/400/200/technics/"
            },
            {
              productID: 5,
              name: "Chef Anton's Gumbo Mix",
              description: "",
              unitPrice: 21.35,
              unitsInStock: 1,
              image: "http://lorempixel.com/400/200/technics/"
            }
          ]
        }
      });
    });

    it("should handle CARD_DESTROY_ITEM action when the product doesn't exist", () => {
      expect(
        products(state, {
          type: Actions.CARD_DESTROY_ITEM,
          payload: { productId: 12 }
        })
      ).toEqual(state);
    });
  });
});
