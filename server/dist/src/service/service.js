"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderService = exports.KlineService = exports.getService = exports.serverOrderWebSockets = exports.serverKlineWebSockets = void 0;
const KlineSocket_1 = require("./KlineSocket");
const klineDataFormat_1 = require("../helper/klineDataFormat");
const orderDataFormat_1 = require("../helper/orderDataFormat");
const orderSocket_1 = require("./orderSocket");
//save socket
exports.serverKlineWebSockets = new Map();
exports.serverOrderWebSockets = new Map();
//save functions which socket need to run
const klineFnMap = new Map(); //save all clientIds
const orderFnMap = new Map(); //save all clientIds
const getService = async (exchange, symbol, time) => {
    const klinService = exports.KlineService(exchange, symbol, time);
    const orderService = await exports.OrderService(exchange, symbol, time);
    return {
        kline: klinService,
        order: orderService,
    };
};
exports.getService = getService;
const KlineService = (exchange, symbol, time) => {
    KlineSocketExist(exchange, symbol, time);
    const addSubscription = (Fn, clientId, type) => {
        const fnType = klineFnMap.get(type);
        fnType === null || fnType === void 0 ? void 0 : fnType.add({
            clientId: clientId,
            sendFn: Fn,
        });
    };
    const deleteSubscription = (clientId, type) => {
        // remove send fn
        const fnType = klineFnMap.get(type);
        let _klineFn = null;
        fnType.forEach((KlineFn) => {
            if (KlineFn.clientId == clientId) {
                _klineFn = KlineFn;
            }
        });
        if (_klineFn) {
            fnType === null || fnType === void 0 ? void 0 : fnType.delete(_klineFn);
        }
        // if delete socket
        if (fnType.size == 0) {
            const socket = exports.serverKlineWebSockets.get(type);
            socket.close();
        }
    };
    return {
        add: addSubscription,
        delete: deleteSubscription,
    };
};
exports.KlineService = KlineService;
// TO DO  
// separate services to two different service
const OrderService = async (exchange, symbol, time) => {
    await OrderSocketExist(exchange, symbol, time);
    const addSubscription = (Fn, clientId, type) => {
        const fnType = orderFnMap.get(type);
        fnType === null || fnType === void 0 ? void 0 : fnType.add({
            clientId: clientId,
            sendFn: Fn,
        });
    };
    const deleteSubscription = (clientId, type) => {
        // remove send fn
        const fnType = orderFnMap.get(type);
        let _orderFn = null;
        fnType.forEach((orderFn) => {
            if (orderFn.clientId == clientId) {
                _orderFn = orderFn;
            }
        });
        if (_orderFn) {
            fnType === null || fnType === void 0 ? void 0 : fnType.delete(_orderFn);
        }
        // if delete socket
        if (fnType.size == 0) {
            const socket = exports.serverKlineWebSockets.get(type);
            socket.close();
        }
    };
    return {
        add: addSubscription,
        delete: deleteSubscription,
    };
};
exports.OrderService = OrderService;
const KlineSocketExist = (exchange, symbol, time) => {
    //remove all closed socket
    for (const [type, socket] of exports.serverKlineWebSockets) {
        if (socket.readyState == 3) {
            exports.serverKlineWebSockets.delete(type);
        }
    }
    //if exist
    const exist = exports.serverKlineWebSockets.has(`${exchange}${symbol}${time}`);
    if (!exist) {
        const klineFn = KlineSocket_1.newKlineWebSocketMap.get(exchange);
        const socketObj = klineFn(time, symbol);
        exports.serverKlineWebSockets.set(socketObj.serverType, socketObj.socket);
        klineFnMap.set(socketObj.serverType, new Set());
        socketObj.socket.onmessage = (event) => {
            const Kline = klineDataFormat_1.getKlineData(event.data, exchange, symbol);
            const functions = klineFnMap.get(socketObj.serverType);
            if (functions) {
                functions.forEach((klineFn) => {
                    klineFn.sendFn(Kline);
                });
            }
        };
    }
};
const OrderSocketExist = async (exchange, symbol, time) => {
    //remove all closed socket
    for (const [type, socket] of exports.serverKlineWebSockets) {
        if (socket.readyState == 3) {
            exports.serverKlineWebSockets.delete(type);
        }
    }
    const exist = exports.serverOrderWebSockets.has(`${exchange}${symbol}${time}`);
    if (!exist) {
        const orderFn = orderSocket_1.newOrderWebSocketMap.get(exchange);
        const socketObj = await orderFn(time, symbol);
        exports.serverOrderWebSockets.set(socketObj.serverType, socketObj.socket);
        orderFnMap.set(socketObj.serverType, new Set());
        socketObj.socket.onmessage = async (event) => {
            const formatFn = orderDataFormat_1.orderFormatFns.get(exchange);
            if (formatFn) {
                const order = await formatFn(JSON.parse(event.data), symbol, time);
                const functions = orderFnMap.get(socketObj.serverType);
                if (functions && order) {
                    functions.forEach((orderFn) => {
                        orderFn.sendFn(order);
                    });
                }
            }
        };
    }
};
