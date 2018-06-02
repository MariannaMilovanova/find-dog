import * as types from '../actions/types';

function user(state = null, action) {
  switch (action.type) {
    case types.SELECT_RADIUS:
      return action.radius;
    case types.ClEAR_FILTERS:
      return false;
    default:
      return state;
  }
}

export default user;
