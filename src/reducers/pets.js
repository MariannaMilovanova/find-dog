import * as types from '../actions/types';

function pets(state = {}, action) {
  switch (action.type) {
    case types.ADD_PET: {
      const {_id} = action;
      return {
        ...state, [_id]: {...action.data, _id}
      }
    }
    default:
      return state;
  }
}

export default pets;