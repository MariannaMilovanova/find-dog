import * as types from './types';
import {uniqueId} from 'lodash';

export function userLogin(data) {
  return {
    type: types.LOGIN_GET_USER_DATA,
    data
  };
}

export function userLogout() {
  return {
    type: types.LOG_OUT
  };
}


export const addTempMarker = coords => {
  return {
    type: types.ADD_TEMP_MARKER,
    coords
  };
}

export const addPet = data => {
  return {
    type: types.ADD_PET,
    _id: uniqueId('pet_'),
    data
  };
};
