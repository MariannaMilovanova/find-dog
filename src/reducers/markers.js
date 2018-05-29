import * as types from '../actions/types';

function markers(state = {}, action) {
  switch (action.type) {
    case types.ADD_TEMP_MARKER:
      return {
        ...state, temp: {type: 'temp', ...action.coords}
      };
    default:
      return state;
  }
}

export default markers;