"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParcelStatus = void 0;
var ParcelStatus;
(function (ParcelStatus) {
    ParcelStatus["PENDING"] = "PENDING";
    ParcelStatus["DISPATCH"] = "DISPATCH";
    ParcelStatus["CANCEL"] = "CANCEL";
    ParcelStatus["IN_TRANSIT"] = "IN_TRANSIT";
    ParcelStatus["OUT_FOR_DELIVERY"] = "OUT_FOR_DELIVERY";
    ParcelStatus["DELIVERED"] = "DELIVERED";
})(ParcelStatus || (exports.ParcelStatus = ParcelStatus = {}));
