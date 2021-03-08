"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*const getSnapshot = async (): Promise<number> => {
  const url = `https://api.binance.com/api/v3/depth?symbol=BTCUSDT&limit=1000`;
  let lastUpdateId = 0;
  await Axios.get(url)
    .then((response) => {
      lastUpdateId = response.data.lastUpdateId;
    })
    .catch(() => {
      return null;
    });
  return lastUpdateId;
};

const newSocket = (): WebSocket =>
  new WebSocket(`wss://stream.binance.com:9443/ws/btcusdt@depth`);

const socketStart = async (socket: WebSocket): Promise<void> => {
  const lastUpdateId = await getSnapshot();
  let first_process = null;
  let result: orderArr = {
    bid: [],
    ask: [],
  };
  socket.onmessage = (event: any) => {
    if (!first_process) {
      first_process = getFirstProcess(JSON.parse(event.data), lastUpdateId);
    } else {
      result = dataFormat(JSON.parse(event.data));
    }

    store.dispatch(
      createAction<orderArr, UPDATE_BINANCE_ORDER>(result, UPDATE_BINANCE_ORDER)
    );
  };
};

const getFirstProcess = (raw_data: any, lastUpdateId: number): any => {
  let first_process = null;
  if (raw_data.u > lastUpdateId) {
    if (raw_data.U <= lastUpdateId + 1 && raw_data.u >= lastUpdateId + 1) {
      console.log("*********");
      first_process = raw_data;
    }
  }
  return first_process;
};

const dataFormat = (raw_data: any): orderArr => {
  const bidArr = raw_data.b.filter((b) => b[1] != "0.00000000");
  const askArr = raw_data.a.filter((a) => a[1] != "0.00000000");
  return {
    bid: bidArr.slice(0, 5),
    ask: askArr.slice(0, 5),
  };
};

export const binanceOrderStart = () => socketStart(newSocket());
*/ 
