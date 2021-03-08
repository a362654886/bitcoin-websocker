import * as React from "react";
import { Redirect, Route } from "react-router-dom";
import { getToken } from "../helpFn/tokenFn";

interface IProps {
  component: any;
  path: string;
}

// nested route

const PrivateRoute = ({ component, path }: IProps): JSX.Element => {
  const isLogin = (): boolean => {
    const result = getToken();
    return !!result;
  };

  return isLogin() ? (
    <Route path={path} component={component} />
  ) : (
    <Redirect to="/login" />
  );
};

export default PrivateRoute;
