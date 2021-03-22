import { Input, Spin } from "antd";
import * as React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { auth_actions, AUTH_USER_LOADING } from "../redux/auth";
import { AlertType, IStoreState } from "../types";
import { LoginType } from "../types/auth-type";
import AlertBox from "../component/alertBox";
import { Button } from 'antd';

const LoginPage = (): JSX.Element => {
  const dispatch = useDispatch();
  const history = useHistory();

  const login_state: LoginType = useSelector(
    (state: IStoreState) => state.login_state
  );

  //userEffect
  useEffect(() => update_page(), [login_state]);

  //userState
  const [user_email, set_user_email] = useState("");
  const [user_password, set_user_password] = useState("");
  const [alertInfo, setAlert] = useState({
    ifShowAlert: false,
    message: "",
    type: AlertType.SUCCESS,
  });

  const input_change = (e: React.ChangeEvent<Element>): void => {
    if ((e.target as HTMLInputElement).placeholder == "email") {
      set_user_email((e.target as HTMLInputElement).value);
    }
    if ((e.target as HTMLInputElement).placeholder == "password") {
      set_user_password((e.target as HTMLInputElement).value);
    }
  };

  const update_page = () => {
    if (login_state == LoginType.SUCCESS) {
      history.push({
        pathname: "/main_page/#",
      });
    }

    if (login_state == LoginType.FAIL) {
      setAlert({
        ifShowAlert: true,
        message: "wrong password",
        type: AlertType.ERROR,
      });
    }
  };

  const submit = async () => {
    dispatch({
      loginType: LoginType.LOADING,
      type: AUTH_USER_LOADING,
    });
    const action = await auth_actions.user_login(user_email, user_password);
    dispatch(action);
  };

  const loading = () => {
    if (login_state == LoginType.LOADING) {
      return (
        <div className="spin">
          <Spin />
        </div>
      );
    } else {
      return (
        <div>
          {AlertBox(alertInfo)}
          <Input
            className="loginInput"
            onChange={input_change}
            placeholder="email"
            value={user_email}
          />
          <Input.Password
            className="loginInput"
            onChange={input_change}
            placeholder="password"
            value={user_password}
          />
          <div id="loginButton">
            <Button data-testid="login-button" onClick={submit}>
              Submit
            </Button>
          </div>
        </div>
      );
    }
  };

  return <div id="loginBody">{loading()}</div>;
};
export default LoginPage;
