import { newStore } from "../src/redux/store";
import express from "express";
import {
  historyBasicData,
  transferBitCoinType,
} from "../types/historyType";
import { getBinanceHistory } from "./serverREST.ts/historyData";
import cors = require("cors");
import { INIT } from "../src/redux/duck/subscription";
import { historyDataFormat } from "./helper/historyDataFormat";

export const store = newStore();
//initial action
store.dispatch({
  payload: "initial",
  type: INIT
})

//express

// Create a new express application instance
const app: express.Application = express();
app.use(cors());

app.get("/getBinanceHistory", async (req, res) => {
  //transfer type
  const params = req.query;
  const {
    symbolPara,
    intervalPara,
    startTimePara,
    endTimePara,
  } = transferBitCoinType(params);
  //get data
  const bitCoinHistoryData: historyBasicData[] = await getBinanceHistory(
    symbolPara,
    intervalPara,
    startTimePara,
    endTimePara
  );
  // format data
  const result = historyDataFormat(bitCoinHistoryData);
  res.send(result);
});

/*app.get("/getStockHistory", async (req, res) => {
  //transfer type
  const params = req.query;
  const { symbolPara, startTimePara, endTimePara } = transferStockType(params);
  //get data
  const bitCoinHistoryData: historyBasicData[] = await getStockHistory(
    symbolPara,
    startTimePara,
    endTimePara
  );
  // format data
  const result = dayOnDayIncrease(bitCoinHistoryData, "stock");
  res.send(result);
});

app.get("/getOilHistory", async (req, res) => {
  //transfer type
  const params = req.query;
  const { startTimePara, endTimePara } = transferStockType(params);
  //get data
  const bitCoinHistoryData: historyBasicData[] = await getOilHistory(
    startTimePara,
    endTimePara
  );
  // format data
  const result = dayOnDayIncrease(bitCoinHistoryData, "stock");
  res.send(result);
});*/

app.listen(8081, () => {
  console.log("listening on port 8081!");
});
