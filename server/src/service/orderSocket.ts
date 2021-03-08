import WebSocket from "ws";
import { SymbolEnum, TimeEnum } from "../../types/enumType";
import { SocketType, WebSocketObj } from "../../types/socketType";

const binanceOrderSocketStart = (
  time: TimeEnum,
  symbol: SymbolEnum
): Pick<SocketType, "serverType" | "socket"> => {
  const socket = new WebSocket(
    `wss://stream.binance.com:9443/ws/${symbol}@depth`
  );
  //const lastUpdateId = await binanceGetSnapshot(symbol);
  return {
    serverType: `BINANCE${symbol}${time}`,
    socket: socket,
  };
};

const bitMEXOrderSocketStart = (
  time: TimeEnum,
  symbol: SymbolEnum
): Pick<SocketType, "serverType" | "socket"> => {
  const socket = new WebSocket(
    `wss://www.bitmex.com/realtime?subscribe=tradeBin${time},orderBookL2_25:${symbol}`
  );
  return {
    serverType: `BITMEX${symbol}${time}`,
    socket: socket,
  };
};

export const newOrderWebSocketMap = new Map<string, WebSocketObj>()
  .set("BINANCE", (time: TimeEnum, symbol: SymbolEnum) =>
    binanceOrderSocketStart(time, symbol)
  )
  .set("BITMEX", (time: TimeEnum, symbol: SymbolEnum) =>
    bitMEXOrderSocketStart(time, symbol)
  );
