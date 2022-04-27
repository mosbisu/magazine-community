import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
// import axios from "axios";
import instance from "../../services/axios";

import { setCookie, getCookie, deleteCookie } from "../../shared/Cookie";

// action types
const SET_USER = "SET_USER";
const LOG_OUT = "LOG_OUT";
const LOG_CHECK = "LOG_CHECK";

// action creators
const setUser = createAction(SET_USER, (user) => ({ user }));
const logOut = createAction(LOG_OUT, (user) => ({ user }));

// initialState
const initialState = {
  user: null,
  isLogin: false,
};

const signupDB = (username, nickname, email, password, navigate) => {
  return function (dispatch, getState) {
    instance
      .post("/api/register", {
        username,
        nickname,
        email,
        password,
      })
      .then(function (response) {
        console.log(response);
        alert("회원가입이 완료되었습니다!");
        navigate("/login");
      })
      .catch(function (error) {
        console.log(error);
      });
  };
};

const loginDB = (username, password, navigate) => {
  return function (dispatch, getState) {
    instance
      .post(`/api/login?username=${username}&password=${password}`)
      // .post("/api/login", { username, password })
      .then(function (response) {
        console.log(response);
        dispatch(setUser({ username, password }));
        navigate("/", { replace: true });
      })
      .catch(function (error) {
        console.log(error.response);
        alert("아이디 혹은 비밀번호를 확인해주세요!");
      });
  };
};

const logOutDB = (navigate) => {
  return function (dispatch, getState) {
    instance
      .post("/api/logout")
      .then(function (response) {
        dispatch(logOut());
        navigate("/", { replace: true });
      })
      .catch(function (error) {
        console.log(error);
      });
  };
};

// reducer immer

export default handleActions(
  {
    [SET_USER]: (state, action) =>
      produce(state, (draft) => {
        setCookie("isLogin", "success");
        setCookie("username", action.payload.user.username);
        draft.user = action.payload.user;
        draft.isLogin = true;
      }),

    [LOG_OUT]: (state, action) =>
      produce(state, (draft) => {
        deleteCookie("isLogin");
        deleteCookie("username");
        draft.user = null;
        draft.isLogin = false;
      }),
  },
  initialState
);

// action creator export
const actionCreators = {
  signupDB,
  loginDB,
  logOutDB,
};

export { actionCreators };
