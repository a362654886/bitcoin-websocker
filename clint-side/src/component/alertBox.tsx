import * as React from "react";
import { Alert } from "antd";
import { AlertType } from "../types";

interface IProps {
  ifShowAlert: boolean;
  message: string;
  type: AlertType;
}

const AlertBox = ({ ifShowAlert, message, type }: IProps): JSX.Element => {
  return <div>{ifShowAlert && <Alert message={message} type={type} />}</div>;
};

export default AlertBox;
