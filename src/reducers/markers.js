import * as types from '../actions/types';
import {get, toLower} from 'lodash';

function markers(state = {temp:{}}, action) {
  switch (action.type) {
    case types.GET_SAVED_MARKERS:
      return {...state, ...action.markers};
    case types.SELECT_MARKER:
      return {...state, selected: action.marker, temp: {}};
    case types.ADD_TEMP_MARKER: {
      const {marker} = action;
      return {
        ...state, temp: marker, selected: {}
      }
    }
    case types.UPLOAD_PICTURE: {
      const {secure_url} = action.payload.data;
      return {...state, temp: {...state.temp, url: secure_url}};
    }
    case types.ADD_PET: {
      const {_id} = action;
      const info = get(action, 'data', {});
      const userId = localStorage.getItem('active')  || 'unknown';
      const marker = {...state.temp, type: toLower(get(info, 'foundOrLost', 'temp')),  _id, info, userId: userId};

      const savedMarkers = JSON.parse(localStorage.getItem('markers')) || {};
      const markersToSave = {...savedMarkers, [_id]: marker};
      localStorage.setItem('markers', JSON.stringify(markersToSave));

      return {
        ...state, [_id]: marker, temp: {}
      }
    }

    default:
      return state;
  }
}

export default markers;