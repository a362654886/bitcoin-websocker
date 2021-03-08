import { createReducer } from "./reducers/reducerFn";

export const UPDATE_SOCKET_CONNECT_DATA = "UPDATE_SOCKET_CONNECT_DATA";
export type UPDATE_SOCKET_CONNECT_DATA = typeof UPDATE_SOCKET_CONNECT_DATA;

export interface SocketConnectUpdateAction {
  payload: Date;
  type: typeof UPDATE_SOCKET_CONNECT_DATA;
}

const handlers = {
  UPDATE_SOCKET_CONNECT_DATA: (
    state: Map<string, number>,
    action: SocketConnectUpdateAction
  ) => {
    const timeString = action.payload.toLocaleTimeString();
    const typeExist = state.has(timeString);
    if (typeExist) {
      const number = state.get(timeString) as number;
      state.set(timeString, number+1);
    } else {
      state.set(timeString, 1);
    }
    const newState = new Map<string, number>(state);
    return newState;
  },
};

export const socketConnection = (
  state: Map<string, number> = new Map<string, number>(),
  action: SocketConnectUpdateAction
): Map<string, number> =>
  createReducer<Map<string, number>>(state, action, handlers);
