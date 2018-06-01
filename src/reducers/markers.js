import * as types from '../actions/types';
import {get, toLower, omit} from 'lodash';

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
    case types.UPDATE_DATA: {
      const {_id} = action;
      const info = get(action, 'data', {});
      const userId = localStorage.getItem('active')  || 'unknown';
      const marker = {...state[_id], type: toLower(get(info, 'foundOrLost', 'temp')),  _id, info, userId: userId};

      const savedMarkers = JSON.parse(localStorage.getItem('markers')) || {};
      const markersToSave = {...savedMarkers, [_id]: marker};
      localStorage.setItem('markers', JSON.stringify(markersToSave));

      return {
        ...state, [_id]: marker, temp: {}, selected: marker
      }
    }
    case types.CHANGE_PHOTO: {
      const {_id} = action;
      const info = get(action, 'data', {});
      const userId = localStorage.getItem('active')  || 'unknown';
      const {secure_url} = action.payload.data;
      const marker = {...state[_id], type: toLower(get(info, 'foundOrLost', 'temp')),  _id, info, userId: userId};

      const savedMarkers = JSON.parse(localStorage.getItem('markers')) || {};
      const markersToSave = {...savedMarkers, [_id]: marker};
      localStorage.setItem('markers', JSON.stringify(markersToSave));

      return {
        ...state, temp: {...state.temp, url: secure_url}, selected: {...state.selected, url: secure_url}, [_id]: {...marker, url: secure_url}
      }
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
    case types.DELETE_MARKER: {
      const {_id} = action;
      const savedMarkers = JSON.parse(localStorage.getItem('markers')) || {};
      const markersToSave = omit(savedMarkers, _id);

      localStorage.setItem('markers', JSON.stringify(markersToSave));
      return {...omit(state, _id), temp: {}, selected: {}}
    }

    default:
      return state;
  }
}

export default markers;