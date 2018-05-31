import * as types from './types';
import {uniqueId} from 'lodash';
import axios from "axios";

export function userLogin(data) {
  return {
    type: types.LOGIN_GET_USER_DATA,
    data
  };
}

export function getSavedMarkers(markers) {
  return {
    type: types.GET_SAVED_MARKERS,
    markers
  };
}

export function userLogout() {
  return {
    type: types.LOG_OUT
  };
}


export const addTempMarker = marker => {
  return {
    type: types.ADD_TEMP_MARKER,
    marker
  };
}

export const addPet = data => {
  return {
    type: types.ADD_PET,
    _id: uniqueId('pet_'),
    data
  };
};

export const uploadImage = file => {
  const cloudName = 'dskimackd';
  const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;
  const formData = new FormData();
  formData.append("file", file);
  formData.append("tags", `codeinfuse, medium, gist`);
  formData.append("upload_preset", "yunvjnkq");
  formData.append("api_key", "359629516473431");
  formData.append("timestamp", (Date.now() / 1000) | 0);
  const request = axios.post(url, formData, {
    headers: { "X-Requested-With": "XMLHttpRequest" },
  });

  return {
    type: types.UPLOAD_PICTURE,
    payload: request
  };
};

