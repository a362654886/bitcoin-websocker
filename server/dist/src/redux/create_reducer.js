"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createReducer = exports.runHandler = exports.mapArray = void 0;
const mapArray = (type, handlers) => {
    for (const key in handlers) {
        if (key == type) {
            return key;
        }
    }
};
exports.mapArray = mapArray;
const runHandler = (state, action, handler) => handler(state, action);
exports.runHandler = runHandler;
const createReducer = (state, action, handlers) => {
    const key = exports.mapArray(action.type, handlers);
    if (key) {
        return exports.runHandler(state, action, handlers[key]);
    }
    return state;
};
exports.createReducer = createReducer;
