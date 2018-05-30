import * as types from '../actions/types';

function markers(state = {temp:{}}, action) {
  switch (action.type) {
    case types.ADD_TEMP_MARKER:
      return {
        ...state, temp: {type: 'temp', ...action.coords}
      };
    case types.UPLOAD_PICTURE: {
      const {secure_url} = action.payload.data;
      return {...state, temp: {...state.temp, url: secure_url}};
    }
    default:
      return state;
  }
}

export default markers;