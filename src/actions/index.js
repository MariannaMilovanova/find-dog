import * as types from './types';

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