import { FETCH_FORE_WEATHER } from "../action/constdef";

export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_FORE_WEATHER:
      return action.payload;
    default:
      return state;
  }
};
