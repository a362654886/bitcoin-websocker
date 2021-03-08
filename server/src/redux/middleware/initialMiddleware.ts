import {
  actionType,
  middleStoreType,
  nextAction,
} from "../../../types/defaultType";
import WebSocket from "ws";
import qs from "qs";
import _ from "lodash";
import { createAction } from "../createAction";
import {
  SubscriptDelete,
  SubscriptionType,
} from "../../../types/subscriptionType";
import { ADD_SUBSCRIPTION, DELETE_SUBSCRIPTION } from "../duck/subscription";
import { clientWebSocketsAdd } from "./clientWsMiddleware";

export const initialMiddleware = (store: middleStoreType) => (
  next: nextAction
) => async (action: actionType): Promise<void> => {
  next(action);
  if (action.type == "@@redux/INIT") {
    const server = new WebSocket.Server({ port: 8080 });
    //ws://localhost:8080/ws?clientId=111222&exchange=BINANCE&symbol=bnbbtc&time=1m
    server.on("connection", function connection(ws, req) {
      const url = req.url;
      // get param from url
      const parameters = qs.parse(_.split(url, "?")[1]); // token=xxxxxx
      // get data from token
      const { clientId, exchange, symbol, time } = JSON.parse(
        JSON.stringify(parameters)
      );

      const subscription: SubscriptionType = {
        subscriptionType: {
          symbol: symbol,
          time: time,
          exchange: exchange,
        },
        clientId: clientId,
      };

      //add subscription
      store.dispatch(
        createAction<SubscriptionType, ADD_SUBSCRIPTION>(
          subscription,
          ADD_SUBSCRIPTION
        )
      );
      //receive mse then update subscription
      // { "exchange":"BINANCE", "symbol":"btcusdt", "time":"1m","type":"update"}
      // { "exchange":"BINANCE", "symbol":"btcusdt", "time":"1m","type":"delete"}

      ws.on("message", async function incoming(message) {
        // change type to topic
        const { exchange, symbol, time, type } = JSON.parse(message.toString());
        if (type == "delete") {
          store.dispatch(
            createAction<SubscriptionType, DELETE_SUBSCRIPTION>(
              {
                subscriptionType: {
                  symbol: symbol,
                  time: time,
                  exchange: exchange,
                },
                clientId: clientId,
              },
              DELETE_SUBSCRIPTION
            )
          );
        } else {
          store.dispatch(
            createAction<SubscriptionType, ADD_SUBSCRIPTION>(
              {
                subscriptionType: {
                  symbol: symbol,
                  time: time,
                  exchange: exchange,
                },
                clientId: clientId,
              },
              ADD_SUBSCRIPTION
            )
          );
        }
      });

      // save ws
      clientWebSocketsAdd(clientId, ws);
    });
  }
};
