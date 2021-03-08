"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serveData = exports.DELETE_DATA = exports.UPDATE_DATA = exports.ADD_DATA = void 0;
const createReducer_1 = require("../createReducer");
exports.ADD_DATA = "ADD_DATA";
exports.UPDATE_DATA = "UPDATE_DATA";
exports.DELETE_DATA = "DELETE_DATA";
const handlers = {
    ADD_DATA: (state, action) => {
        state.set(action.payload, []);
        return state;
    },
    UPDATE_DATA: (state, action) => {
        var _a;
        const data = state.get(action.payload.type);
        if (data) {
            // if new kline in same time
            const end = data[data.length - 1];
            if (end && end.time == ((_a = action.payload.Kline) === null || _a === void 0 ? void 0 : _a.time)) {
                data[data.length - 1] = action.payload.Kline;
            }
            else {
                data.push(action.payload.Kline);
            }
        }
        return state;
    },
    DELETE_DATA: (state, action) => {
        state.delete(action.payload);
        return state;
    },
};
const serveData = (state = new Map(), action) => createReducer_1.createReducer(state, action, handlers);
exports.serveData = serveData;
