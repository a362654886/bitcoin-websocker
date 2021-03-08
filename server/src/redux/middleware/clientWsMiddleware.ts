import {
  actionType,
  middleStoreType,
  nextAction,
} from "../../../types/defaultType";
import WebSocket from "ws";
import { Kline } from "../../../types/Kline";
import { orderArr, OrderBody } from "../../../types/orderType";
import { ADD_SUBSCRIPTION, DELETE_SUBSCRIPTION } from "../duck/subscription";
import { getService } from "../../service/service";

const clientWebSockets = new Map<string, WebSocket>();
export const clientWebSocketsAdd = (id: string, ws: WebSocket): void => {
  clientWebSockets.set(id, ws);
};
export const clientWsMiddleware = (store: middleStoreType) => (
  next: nextAction
) => async (action: actionType): Promise<void> => {
  next(action);
  // send data
  if (action.type == ADD_SUBSCRIPTION) {
    const service = await getService(
      action.payload.subscriptionType.exchange,
      action.payload.subscriptionType.symbol,
      action.payload.subscriptionType.time
    );
    const ws = clientWebSockets.get(action.payload.clientId) as WebSocket;
    const typeString = `${action.payload.subscriptionType.exchange}${action.payload.subscriptionType.symbol}${action.payload.subscriptionType.time}`;
    //send Kline
    service.kline.add(
      (kline: Kline) => {
        const body = {
          type: typeString,
          kline: kline,
        };
        if (kline) {
          // if subscription
          const type = typeString;
          const set = store.getState().subscription.get(type);
          const exist = set?.has(action.payload.clientId);
          if (exist) {
            ws.send(JSON.stringify(body));
          }
        }
      },
      action.payload.clientId,
      typeString
    );
    //send order
    service.order.add(
      (order: OrderBody) => {
        const body = {
          type: `${order.serverType}`,
          order: order.body,
        };
        const type = typeString;
        const set = store.getState().subscription.get(type);
        const exist = set?.has(action.payload.clientId);
        if (exist) {
          ws.send(JSON.stringify(body));
        }
      },
      action.payload.clientId,
      typeString
    );
  }

  if (action.type == DELETE_SUBSCRIPTION) {
    const service = await getService(
      action.payload.subscriptionType.exchange,
      action.payload.subscriptionType.symbol,
      action.payload.subscriptionType.time
    );
    //delete client
    service.kline.delete(
      action.payload.clientId,
      `${action.payload.subscriptionType.exchange}${action.payload.subscriptionType.symbol}${action.payload.subscriptionType.time}`
    );
    service.order.delete(
      action.payload.clientId,
      `${action.payload.subscriptionType.exchange}${action.payload.subscriptionType.symbol}${action.payload.subscriptionType.time}`
    );
  }
};
