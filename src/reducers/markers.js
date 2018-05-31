import * as types from '../actions/types';
import {get, toLower} from 'lodash';

function markers(state = {temp:{}}, action) {
  switch (action.type) {
    case types.ADD_TEMP_MARKER: {
      const {marker} = action;
      return {
        ...state, temp: marker
      }
    }
    case types.UPLOAD_PICTURE: {
      const {secure_url} = action.payload.data;
      return {...state, temp: {...state.temp, url: secure_url}};
    }
    case types.ADD_PET: {
      const {_id} = action;
      const info = get(action, 'data', {});

      return {
        ...state, [_id]: {...state.temp, type: toLower(get(info, 'foundOrLost', 'temp')),  _id, info}, temp: {}
      }
    }
    default:
      return state;
  }
}

export default markers;