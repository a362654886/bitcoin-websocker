"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bitMEXDataFormat = void 0;
const bitMEXDataFormat = (raw_data, symbol) => {
    if (raw_data.data && (raw_data === null || raw_data === void 0 ? void 0 : raw_data.data[0].symbol) == symbol) {
        return {
            open_price: raw_data === null || raw_data === void 0 ? void 0 : raw_data.data[0].open,
            close_price: raw_data === null || raw_data === void 0 ? void 0 : raw_data.data[0].close,
            high_price: raw_data === null || raw_data === void 0 ? void 0 : raw_data.data[0].high,
            low_price: raw_data === null || raw_data === void 0 ? void 0 : raw_data.data[0].low,
            time: raw_data === null || raw_data === void 0 ? void 0 : raw_data.data[0].timestamp,
        };
    }
    else {
        return null;
    }
};
exports.bitMEXDataFormat = bitMEXDataFormat;
