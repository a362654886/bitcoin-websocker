"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.store = void 0;
const tslib_1 = require("tslib");
const store_1 = require("../src/redux/store");
const express_1 = tslib_1.__importDefault(require("express"));
const historyType_1 = require("../types/historyType");
const historyData_1 = require("./serverREST.ts/historyData");
const cors = require("cors");
const subscription_1 = require("../src/redux/duck/subscription");
const historyDataFormat_1 = require("./helper/historyDataFormat");
exports.store = store_1.newStore();
//initial action
exports.store.dispatch({
    payload: "initial",
    type: subscription_1.INIT
});
//express
// Create a new express application instance
const app = express_1.default();
app.use(cors());
app.get("/getBinanceHistory", async (req, res) => {
    //transfer type
    const params = req.query;
    const { symbolPara, intervalPara, startTimePara, endTimePara, } = historyType_1.transferBitCoinType(params);
    //get data
    const bitCoinHistoryData = await historyData_1.getBinanceHistory(symbolPara, intervalPara, startTimePara, endTimePara);
    // format data
    const result = historyDataFormat_1.historyDataFormat(bitCoinHistoryData);
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
