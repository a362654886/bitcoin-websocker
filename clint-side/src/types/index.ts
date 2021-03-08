import { LoginType } from "./auth-type";
import { Client, Subscription, webSocketData } from "./socketType";

export interface IStoreState {
  login_state: LoginType;
  client: Client;
  socketData: Map<string, webSocketData>;
  subscription: Map<string, Subscription>;
  socketConnection: Map<string, number>;
}

export interface Alert {
  ifShowAlert: boolean;
  message: string;
  type: AlertType;
}

export enum AlertType {
  SUCCESS = "success",
  WARNING = "warning",
  ERROR = "error"
}