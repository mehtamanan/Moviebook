import { urls, params } from '../utils';
import {
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL
} from '../utils/types';

export const loginUser = ({ username, password }) => {
  return (dispatch) => {
    const body = {}
    body[params.username] = username;
    body[params.password] = password;
    const requestParams = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    }

    fetch(urls.base_url + urls.token_auth, requestParams)
    .then(response => response.json())
    .then(data => {
      if (data.token !== undefined) {
        loginUserSuccess(dispatch, data[params.token]);
      } else {
        loginUserFail(dispatch, data[params.non_field_errors]);
      }
    });
  }
}

const loginUserSuccess = (dispatch, token) => {
  dispatch({ type: LOGIN_USER_SUCCESS, payload: token });
};

const loginUserFail = (dispatch, errors) => {
  dispatch({ type: LOGIN_USER_FAIL, payload: errors });
};
