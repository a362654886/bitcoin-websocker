"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatDate = void 0;
const formatDate = (date) => {
    const y = date.getFullYear();
    const m = date.getMonth() + 1;
    const month = m < 10 ? "0" + m : m;
    const d = date.getDate();
    const day = d < 10 ? "0" + d : d;
    const h = date.getHours();
    const minute = date.getMinutes();
    const _minute = minute < 10 ? "0" + minute : minute;
    const second = date.getSeconds();
    const _second = minute < 10 ? "0" + second : second;
    return y + "-" + month + "-" + day + " " + h + ":" + _minute + ":" + _second;
};
exports.formatDate = formatDate;
