"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reducer = void 0;
const redux_1 = require("redux");
const subscription_1 = require("./duck/subscription");
exports.reducer = redux_1.combineReducers({
    subscription: subscription_1.subscription
});
