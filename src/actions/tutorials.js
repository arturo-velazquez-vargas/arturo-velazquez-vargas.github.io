import {
  CREATE_TUTORIAL,
  RETRIEVE_TUTORIALS,
  UPDATE_TUTORIAL,
  DELETE_TUTORIAL,
  DELETE_ALL_TUTORIALS,
  GET_ALL_PRODUCTS
} from "./types";

import TutorialDataService from "../services/tutorial.service";

export const getAll = () => async (dispatch) => {
  console.log("In getAll function ")
  try {
    const res = await TutorialDataService.getAllProducts();
    console.log("Response "+ res)
    dispatch({
      type: GET_ALL_PRODUCTS,
      payload: res.data,
    });

    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};
