import {
  CREATE_TUTORIAL,
  RETRIEVE_TUTORIALS,
  UPDATE_TUTORIAL,
  DELETE_TUTORIAL,
  DELETE_ALL_TUTORIALS,
} from "../actions/types";

const initialState = [];

function productsReducer(products = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_ALL_PRODUCTS:
      return payload;

    default:
      return products;
  }
};

export default productsReducer;
