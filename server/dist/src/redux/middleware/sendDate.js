"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.wsMiddleWare = void 0;
const tslib_1 = require("tslib");
const binance_1 = require("../duck/binance");
const bitMEX_1 = require("../duck/bitMEX");
const ws_1 = tslib_1.__importDefault(require("ws"));
//should be array
let wsb;
//let cName = "";
const a = new Map();
const dbObj = null;
const wsMiddleWare = () => {
    const server = new ws_1.default.Server({ port: 8080 });
    server.on("connection", function connection(ws, req) {
        // get token from req
        // bind ws and id 
        // save ws in map
        const ip = req.connection.remoteAddress;
        const port = req.connection.remotePort;
        //client id
        const clientName = ip + port;
        a.set(1, ws);
        //wsb = ws
    });
    return (store) => (next) => async (action) => {
        next(action);
        if (action.type == binance_1.UPDATE_BINANCE || action.type == bitMEX_1.UPDATE_BITMEX) {
            //I dont know how to do it ....
            /*server.clients.forEach(function each(client) {
              if (client.clientName === cName) {
                  client.send(JSON.stringify(subscription(msg as BourseType)));
              }
            });*/
            //wsb.send("Asd");
            console.log(a);
        }
    };
};
exports.wsMiddleWare = wsMiddleWare;
