"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParcelServices = void 0;
const uuid_1 = require("uuid");
const parcel_interface_1 = require("./parcel.interface");
const parcel_model_1 = require("./parcel.model");
const AppError_1 = __importDefault(require("../../errorHelpers/AppError"));
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const user_interface_1 = require("../user/user.interface");
// ! create parcel
const createParcelIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const trackingId = `TRK-${(0, uuid_1.v4)().split("-")[0].toUpperCase()}`;
    const { weight } = payload;
    const weightNum = parseFloat(weight);
    const totalPrice = weightNum * 200;
    const result = yield parcel_model_1.Parcel.create(Object.assign(Object.assign({}, payload), { price: totalPrice, trackingId, parcelStatus: parcel_interface_1.ParcelStatus.PENDING, statusLog: [
            {
                status: parcel_interface_1.ParcelStatus.PENDING,
                timeStamp: new Date(),
                updatedBy: "SYSTEM",
                note: "Parcel created",
            },
        ] }));
    return result;
});
// ! retrieve parcel
const getMyParcelFromDB = (senderId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield parcel_model_1.Parcel.find({ senderId });
    if (result.length === 0) {
        throw new AppError_1.default(http_status_codes_1.default.BAD_REQUEST, "No parcel found for this sender");
    }
    return result;
});
// ! cancel parcel
const cancelParcelFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const parcel = yield parcel_model_1.Parcel.findById(id);
    if (!parcel) {
        throw new AppError_1.default(http_status_codes_1.default.BAD_REQUEST, "Parcel not found");
    }
    if (parcel.parcelStatus !== parcel_interface_1.ParcelStatus.PENDING) {
        throw new AppError_1.default(http_status_codes_1.default.BAD_REQUEST, "Only pending parcels can be cancelled");
    }
    parcel.parcelStatus = parcel_interface_1.ParcelStatus.CANCEL;
    (_a = parcel.statusLog) === null || _a === void 0 ? void 0 : _a.push({
        status: parcel_interface_1.ParcelStatus.CANCEL,
        timestamp: new Date(),
        updatedBy: "SYSTEM",
        note: "Cancelled without auth",
    });
    yield parcel.save();
    return parcel;
});
// ! show status log
const getStatusLog = (id, user) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const parcel = yield parcel_model_1.Parcel.findById(id).select("statusLog");
    if (!parcel) {
        throw new AppError_1.default(http_status_codes_1.default.NOT_FOUND, "Parcel not found");
    }
    const userId = user.userId;
    const userRole = user.role;
    const isSender = ((_a = parcel.senderId) === null || _a === void 0 ? void 0 : _a.toString()) === userId;
    const isReceiver = ((_b = parcel.receiverId) === null || _b === void 0 ? void 0 : _b.toString()) === userId;
    const isAdmin = userRole === user_interface_1.Role.ADMIN;
    if (!isSender && isReceiver && isAdmin) {
        throw new AppError_1.default(http_status_codes_1.default.UNAUTHORIZED, "You are not authorized to view this status log");
    }
    return parcel;
});
// ! dispatch Parcel
const dispatchParcelFromDB = (id, updatedBy) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const parcel = yield parcel_model_1.Parcel.findById(id);
    if (!parcel) {
        throw new AppError_1.default(http_status_codes_1.default.NOT_FOUND, "Parcel not found");
    }
    if (parcel.parcelStatus !== parcel_interface_1.ParcelStatus.PENDING) {
        throw new AppError_1.default(http_status_codes_1.default.BAD_REQUEST, "Only pending parcels can be dispatched");
    }
    parcel.parcelStatus = parcel_interface_1.ParcelStatus.DISPATCH;
    (_a = parcel.statusLog) === null || _a === void 0 ? void 0 : _a.push({
        status: parcel_interface_1.ParcelStatus.DISPATCH,
        timestamp: new Date(),
        updatedBy: updatedBy || "ADMIN",
        note: "Parcel dispatched from warehouse",
    });
    yield parcel.save();
    return parcel;
});
// ! parcel in transit
const parcelInTransitFromDB = (id, updatedBy) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const parcel = yield parcel_model_1.Parcel.findById(id);
    if (!parcel) {
        throw new AppError_1.default(http_status_codes_1.default.NOT_FOUND, "Parcel not found");
    }
    //! If already IN_TRANSIT, return early
    if (parcel.parcelStatus === parcel_interface_1.ParcelStatus.IN_TRANSIT) {
        throw new AppError_1.default(http_status_codes_1.default.BAD_REQUEST, "This parcel is already marked as IN_TRANSIT");
    }
    //! If not DISPATCH,
    if (parcel.parcelStatus !== parcel_interface_1.ParcelStatus.DISPATCH) {
        throw new AppError_1.default(http_status_codes_1.default.BAD_REQUEST, "Parcel must be DISPATCHED before marking as IN_TRANSIT");
    }
    parcel.parcelStatus = parcel_interface_1.ParcelStatus.IN_TRANSIT;
    (_a = parcel.statusLog) === null || _a === void 0 ? void 0 : _a.push({
        status: parcel_interface_1.ParcelStatus.IN_TRANSIT,
        timestamp: new Date(),
        updatedBy: updatedBy || "ADMIN",
        note: "Parcel is in transit",
    });
    yield parcel.save();
    return parcel;
});
// ! parcel OUT_FOR_DELIVERY
const parcelOutForDelivery = (id, updatedBy) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const parcel = yield parcel_model_1.Parcel.findById(id);
    if (!parcel) {
        throw new AppError_1.default(http_status_codes_1.default.NOT_FOUND, "Parcel not found");
    }
    //! Prevent duplicate status update
    if (parcel.parcelStatus === parcel_interface_1.ParcelStatus.OUT_FOR_DELIVERY) {
        throw new AppError_1.default(http_status_codes_1.default.BAD_REQUEST, "Parcel is already marked as OUT_FOR_DELIVERY");
    }
    //! Ensure valid state transition
    if (parcel.parcelStatus !== parcel_interface_1.ParcelStatus.IN_TRANSIT) {
        throw new AppError_1.default(http_status_codes_1.default.BAD_REQUEST, "Parcel must be IN TRANSIT before marking as OUT_FOR_DELIVERY");
    }
    parcel.parcelStatus = parcel_interface_1.ParcelStatus.OUT_FOR_DELIVERY;
    (_a = parcel.statusLog) === null || _a === void 0 ? void 0 : _a.push({
        status: parcel_interface_1.ParcelStatus.OUT_FOR_DELIVERY,
        timestamp: new Date(),
        updatedBy: updatedBy || "ADMIN",
        note: "Parcel is out for delivery",
    });
    yield parcel.save();
    return parcel;
});
//! confirm delivered by (receiver)
const confirmParcelDelivery = (id, receiverId) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const parcel = yield parcel_model_1.Parcel.findById(id);
    if (!parcel) {
        throw new AppError_1.default(http_status_codes_1.default.NOT_FOUND, "Parcel not found");
    }
    if (parcel.receiverId.toString() !== receiverId) {
        throw new AppError_1.default(http_status_codes_1.default.FORBIDDEN, "You are not the receiver");
    }
    if (parcel.parcelStatus !== parcel_interface_1.ParcelStatus.OUT_FOR_DELIVERY) {
        throw new AppError_1.default(http_status_codes_1.default.BAD_REQUEST, "Parcel must be OUT_FOR_DELIVERY to confirm");
    }
    parcel.parcelStatus = parcel_interface_1.ParcelStatus.DELIVERED;
    (_a = parcel.statusLog) === null || _a === void 0 ? void 0 : _a.push({
        status: parcel_interface_1.ParcelStatus.DELIVERED,
        timestamp: new Date(),
        updatedBy: receiverId,
        note: "Parcel received by receiver",
    });
    yield parcel.save();
    return parcel;
});
// ! check incoming parcel (RECEIVER)
const findIncomingParcels = (receiverId) => __awaiter(void 0, void 0, void 0, function* () {
    const parcel = yield parcel_model_1.Parcel.find({
        receiverId,
        parcelStatus: { $ne: parcel_interface_1.ParcelStatus.DELIVERED },
    });
    if (parcel.length === 0) {
        throw new AppError_1.default(http_status_codes_1.default.NOT_FOUND, "No incoming parcel exist");
    }
    return parcel;
});
// ! delivery history
const findDeliveredParcels = (receiverId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield parcel_model_1.Parcel.find({
        receiverId,
        parcelStatus: parcel_interface_1.ParcelStatus.DELIVERED,
    });
});
// ! get all parcel (ADMIN)
const getAllParcelsByAdminFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const parcels = yield parcel_model_1.Parcel.find().populate("senderId receiverId");
    return parcels;
});
// ! parcel block by (ADMIN)
const blockParcelsByAdmin = (parcelId) => __awaiter(void 0, void 0, void 0, function* () {
    const parcel = yield parcel_model_1.Parcel.findOne({ _id: parcelId });
    if (!parcel) {
        throw new AppError_1.default(http_status_codes_1.default.NOT_FOUND, "Parcel not found");
    }
    if (parcel.isBlocked) {
        throw new AppError_1.default(http_status_codes_1.default.CONFLICT, "Parcel already blocked");
    }
    parcel.isBlocked = true;
    yield parcel.save();
    return parcel;
});
// ! parcel unblock by (ADMIN)
const unblockParcelsByAdmin = (parcelId) => __awaiter(void 0, void 0, void 0, function* () {
    const parcel = yield parcel_model_1.Parcel.findOne({ _id: parcelId });
    if (!parcel) {
        throw new AppError_1.default(http_status_codes_1.default.NOT_FOUND, "Parcel not found");
    }
    if (!parcel.isBlocked) {
        throw new AppError_1.default(http_status_codes_1.default.CONFLICT, "Parcel already unblocked");
    }
    parcel.isBlocked = false;
    yield parcel.save();
    return parcel;
});
// ! track parcel by trackingId
const trackParcel = (trackingId) => __awaiter(void 0, void 0, void 0, function* () {
    const parcel = yield parcel_model_1.Parcel.findOne({ trackingId }).populate("senderId receiverId");
    if (!parcel) {
        throw new AppError_1.default(http_status_codes_1.default.NOT_FOUND, "Parcel not found for this tracking id");
    }
    return parcel;
});
exports.ParcelServices = {
    createParcelIntoDB,
    getMyParcelFromDB,
    cancelParcelFromDB,
    getStatusLog,
    dispatchParcelFromDB,
    parcelInTransitFromDB,
    parcelOutForDelivery,
    confirmParcelDelivery,
    findIncomingParcels,
    findDeliveredParcels,
    getAllParcelsByAdminFromDB,
    blockParcelsByAdmin,
    unblockParcelsByAdmin,
    trackParcel,
};
