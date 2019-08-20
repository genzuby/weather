import { FETCH_CURR_WEATHER } from "../action/constdef";

export default (state = null, action) => {
  switch (action.type) {
    case FETCH_CURR_WEATHER:
      return action.payload;
    default:
      return state;
  }
};
