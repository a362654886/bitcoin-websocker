export const createAction = <T, U>(
  value: T,
  type: U
): { payload: T; type: U } => {
  return { payload: value, type: type };
};
