import { actionType } from "../../types/defaultType";

interface SimpleKeyValueObject {
  [key: string]: any;
}
  

export const mapArray = (
  type: string,
  handlers: SimpleKeyValueObject
): string | undefined => {
  for (const key in handlers) {
    if (key == type) {
      return key;
    }
  }
};

export const runHandler = <T>(
  state: T,
  action: actionType,
  handler: (state: T, action: actionType) => T
): T => handler(state, action);

export const createReducer = <T>(
  state: T,
  action: actionType,
  handlers: SimpleKeyValueObject
): T => {
  const key = mapArray(action.type, handlers);
  if (key) {
    return runHandler<T>(state, action, handlers[key]);
  }
  return state;
};
