"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAction = void 0;
const createAction = (value, type) => {
    return { payload: value, type: type };
};
exports.createAction = createAction;
