"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Parcel = void 0;
const mongoose_1 = require("mongoose");
const parcel_interface_1 = require("./parcel.interface");
const statusLogSchema = new mongoose_1.Schema({
    status: {
        type: String,
        enum: Object.values(parcel_interface_1.ParcelStatus),
        required: true,
    },
    timestamp: { type: Date, default: Date.now },
    // updatedBy: { type: Schema.Types.ObjectId, ref: "User" },
    updatedBy: { type: String },
    note: { type: String },
}, { _id: false });
const parcelSchema = new mongoose_1.Schema({
    weight: { type: String, required: true },
    price: { type: Number, required: true },
    trackingId: { type: String, unique: true },
    isBlocked: { type: Boolean, default: false },
    senderId: { type: mongoose_1.Schema.Types.ObjectId, ref: "User" },
    receiverId: { type: mongoose_1.Schema.Types.ObjectId, required: true, ref: "User" },
    parcelStatus: {
        type: String,
        enum: Object.values(parcel_interface_1.ParcelStatus),
    },
    originalAddress: { type: String, required: true },
    destinationAddress: { type: String, required: true },
    statusLog: [statusLogSchema],
});
exports.Parcel = (0, mongoose_1.model)("Parcel", parcelSchema);
