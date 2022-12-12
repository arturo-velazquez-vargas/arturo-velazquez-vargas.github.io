import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
} from "../actions/types";


const initialState = {
  isLoggedIn : false,
  user: null
};
export default function (state = initialState, action) {
  const { type, payload } = action;
  console.log('In reducer ');
  console.log('Type ', type);
  console.log('Payload ', payload);
  console.log(state.user);
  console.log(state.isLoggedIn);
  switch (type) {
    case REGISTER_SUCCESS:
      return {
        ...state,
        isLoggedIn: false,
      };
    case REGISTER_FAIL:
      return {
        ...state,
        isLoggedIn: false,
      };
    case LOGIN_SUCCESS:
      console.log('IN LOGIN_SUCCESS');
      console.log(state);
      return {
        ...state,
        isLoggedIn: true,
        user: payload.user,
      };
    case LOGIN_FAIL:
      return {
        ...state,
        isLoggedIn: false,
        user: null,
      };
    case LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
        user: null,
      };
    default:
      return state;
  }
}
