export function userLogin(data) {
  return {
    type: 'LOGIN_GET_USER_DATA',
    data
  };
}

export function userLogout() {
  return {
    type: 'LOG_OUT'
  };
}
