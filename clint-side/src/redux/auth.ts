import { createReducer } from "./reducers/reducerFn";
import { LoginType, user } from "../types/auth-type";
import { createAction, Dispatch } from "@reduxjs/toolkit";
import { userAuth } from "../api/userApi";
import { setToken } from "../helpFn/tokenFn";

//actions

export const AUTH_USER_INI = "AUTH_USER_INI";
export type AUTH_USER_INI = typeof AUTH_USER_INI;

export const AUTH_USER_LOADING = "AUTH_USER_LOADING";
export type AUTH_USER_LOADING = typeof AUTH_USER_LOADING;

export const AUTH_USER_SUCCESS = "AUTH_USER_SUCCESS";
export type AUTH_USER_SUCCESS = typeof AUTH_USER_SUCCESS;

export const AUTH_USER_FAIL = "AUTH_USER_FAIL";
export type AUTH_USER_FAIL = typeof AUTH_USER_FAIL;

export type authType =
  | AUTH_USER_INI
  | AUTH_USER_LOADING
  | AUTH_USER_SUCCESS
  | AUTH_USER_FAIL;

//action type
export interface AuthUserIniAction {
  loginType: LoginType;
  type: typeof AUTH_USER_INI;
}

export interface AuthUserLoadingAction {
  loginType: LoginType;
  type: typeof AUTH_USER_LOADING;
}

export interface AuthUserSuccessAction {
  loginType: LoginType;
  type: typeof AUTH_USER_SUCCESS;
}

export interface AuthUserFailAction {
  loginType: LoginType;
  type: typeof AUTH_USER_FAIL;
}

export type AuthUser =
  | AuthUserIniAction
  | AuthUserLoadingAction
  | AuthUserSuccessAction
  | AuthUserFailAction;

//reducer
const handlers = {
  AUTH_USER_INI: (state: LoginType, action: AuthUser) => action.loginType,
  AUTH_USER_LOADING: (state: LoginType, action: AuthUser) => action.loginType,
  AUTH_USER_SUCCESS: (state: LoginType, action: AuthUser) => action.loginType,
  AUTH_USER_FAIL: (state: LoginType, action: AuthUser) => action.loginType,
};
export const login_state = (
  state: LoginType = LoginType.INITIALIZATION,
  action: AuthUser
): LoginType => createReducer<LoginType>(state, action, handlers);

//action creators
export const auth_actions = {
  user_login: async (
    email: string,
    password: string
  ): Promise<(dispatch: Dispatch) => void> => (dispatch: Dispatch) =>
    userAuth(email, password)
      .then((res) => {
        handle_auth_result(res, dispatch);
      })
      .catch(() => {
        dispatch({
          loginType: LoginType.FAIL,
          type: AUTH_USER_FAIL,
        });
      }),
  authUserIni: createAction<LoginType>(AUTH_USER_INI),
  authUserLoading: createAction<LoginType>(AUTH_USER_LOADING),
  authUserSuccess: createAction<LoginType>(AUTH_USER_SUCCESS),
  authUserFail: createAction<LoginType>(AUTH_USER_FAIL),
};

// auth helper fn

const handle_auth_result = (
  res: {
    User: user;
    Token: string;
  } | null,
  dispatch: Dispatch
): void => {
  if (res != null) {
    setToken(res.Token);
    dispatch({
      loginType: LoginType.SUCCESS,
      type: AUTH_USER_SUCCESS,
    });
  } else {
    dispatch({
      loginType: LoginType.FAIL,
      type: AUTH_USER_FAIL,
    });
  }
};
