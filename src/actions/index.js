/* eslint-disable no-multi-assign */
/* eslint-disable import/prefer-default-export */
export const setFavorite = (payload) => ({
  type: 'SET_FAVORITE',
  payload,
});

export const unsetFavorite = (payload) => ({
  type: 'UNSET_FAVORITE',
  payload,
});

export const loginRequest = (payload) => ({
  type: 'LOGIN_REQUEST',
  payload,
});

export const logoutRequest = (payload) => ({
  type: 'LOGOUT_REQUEST',
  payload,
});

export const registerRequest = (payload) => ({
  type: 'REGISTER_REQUEST',
  payload,
});

export const getVideo = (payload) => ({
  type: 'GET_VIDEO',
  payload,
});

export const searchVideo = (payload) => ({
  type: 'SEARCH_VIDEO',
  payload,
});

