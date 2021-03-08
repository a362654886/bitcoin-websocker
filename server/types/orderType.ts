export type orderArr = {
  bid: [string,any][];
  ask: [string,any][];
};

export type OrderBody = {
  serverType: string;
  body: orderArr;
};
