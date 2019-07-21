import { GET_ERRORS, CLEAR_ERRORS } from '../actions/types';

const initialState = {};

export default function(state = initialState, actions) {
  switch (actions.type) {
    case GET_ERRORS:
      return actions.payload;
    case CLEAR_ERRORS:
      return {};
    default:
      return state;
  }
}
