"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.get_bitMEX_data = exports.bitMEX_start = void 0;
const tslib_1 = require("tslib");
const ws_1 = tslib_1.__importDefault(require("ws"));
let bitMEX_data = {
    open_price: 0,
    close_price: 0,
    high_price: 0,
    low_price: 0,
    time: "",
};
const new_socket = (time) => new ws_1.default(`wss://www.bitmex.com/realtime?subscribe=tradeBin${time}`);
const listen_start = (socket) => {
    socket.onmessage = (event) => {
        const _data = JSON.parse(event.data);
        if (_data.data) {
            bitMEX_data = data_format(JSON.parse(event.data));
        }
    };
};
const data_format = (raw_data) => {
    const _data = raw_data === null || raw_data === void 0 ? void 0 : raw_data.data[0];
    if (_data.symbol == "XBTUSD") {
        return {
            open_price: _data.open,
            close_price: _data.close,
            high_price: _data.high,
            low_price: _data.low,
            time: _data.timestamp,
        };
    }
    else {
        return bitMEX_data;
    }
};
const bitMEX_start = (time) => listen_start(new_socket(time));
exports.bitMEX_start = bitMEX_start;
const get_bitMEX_data = () => bitMEX_data;
exports.get_bitMEX_data = get_bitMEX_data;
