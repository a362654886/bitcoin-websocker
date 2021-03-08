import { SymbolEnum, TimeEnum } from "../../types/enumType";
import WebSocket from "ws";
import { SocketType, WebSocketObj } from "../../types/socketType";

const binanceKlineSocketStart = (
  time: TimeEnum,
  symbol: SymbolEnum
): Pick<SocketType, "serverType" | "socket"> => {
  const socket = new WebSocket(
    `wss://stream.binance.com:9443/ws/${symbol}@kline_${time}`
  );
  return {
    serverType: `BINANCE${symbol}${time}`,
    socket: socket,
  };
};

const bitMEXKlineSocketStart = (
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

export const newKlineWebSocketMap = new Map<string, WebSocketObj>()
  .set("BINANCE", (time: TimeEnum, symbol: SymbolEnum) =>
    binanceKlineSocketStart(time, symbol)
  )
  .set("BITMEX", (time: TimeEnum, symbol: SymbolEnum) =>
    bitMEXKlineSocketStart(time, symbol)
  );
