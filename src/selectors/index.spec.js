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

    it("should produce cart items based on state `cart` object", () => {
      expect(getCartItems(state)).toEqual([
        {
          productID: 4,
          name: "Chef Anton's Cajun Seasoning",
          description: "",
          quantity: 1,
          unitPrice: 22,
          unitsInStock: 52,
          image: "http://lorempixel.com/400/200/technics/"
        },
        {
          productID: 6,
          name: "Grandma's Boysenberry Spread",
          description: "",
          quantity: 3,
          unitPrice: 25,
          unitsInStock: 117,
          image: "http://lorempixel.com/400/200/technics/"
        }
      ]);
    });

    it("should calculate cart items total price", () => {
      expect(getTotalPrice(state)).toEqual(97);
    });
  });
});
