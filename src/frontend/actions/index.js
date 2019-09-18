/* eslint-disable no-multi-assign */
/* eslint-disable import/prefer-default-export */
import axios from 'axios'

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

export const setError = (payload) => ({
  type: 'SET_ERROR',
  payload,
})

export const registerUser = (payload, redirectUrl) => {
  return (dispatch) => {
    axios.post('/auth/sign-up', payload)
    .then(({ data }) => {
      dispatch(registerRequest(data))
    })
    .then(() => {
      window.location.href = redirectUrl
    })
    .catch((err) => {
      dispatch(setError(err))
    })
  }
}

export const loginUser = ({email, password}, redirectUrl) => {
  return (dispatch) => {
    axios({
      url: '/auth/sign-in',
      method: 'post',
      auth: {
        username: email,
        password
      }
    })
    .then(({ data }) => {
      document.cookie = `email=${data.user.email}`
      document.cookie = `name=${data.user.name}`
      document.cookie = `id=${data.user.id}`
      dispatch(loginRequest(data))
    })
    .then(() => {
      window.location.href = redirectUrl
    })
    .catch((err) => {
      dispatch(setError(err))
    })
  }
}
