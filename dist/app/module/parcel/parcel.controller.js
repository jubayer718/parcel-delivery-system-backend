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
exports.ParcelControllers = void 0;
const catchAsync_1 = require("../../utils/catchAsync");
const parcel_service_1 = require("./parcel.service");
const sendResponse_1 = require("../../utils/sendResponse");
const http_status_codes_1 = __importDefault(require("http-status-codes"));
// ! create parcel
const createParcel = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const senderId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
    const result = yield parcel_service_1.ParcelServices.createParcelIntoDB(Object.assign(Object.assign({}, req.body), { senderId }));
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        message: "Parcel created successfully",
        statusCode: http_status_codes_1.default.CREATED,
        data: result,
    });
}));
// ! retrieve sender own parcel
const getAllMyParcel = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const senderId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
    const result = yield parcel_service_1.ParcelServices.getMyParcelFromDB(senderId);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        message: "All parcel retrieve successfully",
        statusCode: http_status_codes_1.default.OK,
        data: result,
    });
}));
// ! cancel parcel
const cancelParcel = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield parcel_service_1.ParcelServices.cancelParcelFromDB(id);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        message: "Parcel cancelled successfully",
        statusCode: http_status_codes_1.default.OK,
        data: result,
    });
}));
// ! show parcel status log
const statusLog = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield parcel_service_1.ParcelServices.getStatusLog(id, req.user);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        message: "Status log showed successfully",
        statusCode: http_status_codes_1.default.OK,
        data: result,
    });
}));
// ! parcel dispatch
const parcelDispatch = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { id } = req.params;
    const updatedBy = (_a = req.user) === null || _a === void 0 ? void 0 : _a.role;
    const result = yield parcel_service_1.ParcelServices.dispatchParcelFromDB(id, updatedBy);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_codes_1.default.OK,
        message: "Parcel dispatched successfully",
        data: result,
    });
}));
// ! parcel in transit
const parcelInTransit = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { id } = req.params;
    const updatedBy = (_a = req.user) === null || _a === void 0 ? void 0 : _a.role;
    const result = yield parcel_service_1.ParcelServices.parcelInTransitFromDB(id, updatedBy);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_codes_1.default.OK,
        message: "Parcel marked as IN_TRANSIT successfully",
        data: result,
    });
}));
// ! parcel out for delivery
const parcelOUtForDelivery = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    // const updatedBy = req.user?.email || "ADMIN";
    const updatedBy = "ADMIN";
    const result = yield parcel_service_1.ParcelServices.parcelOutForDelivery(id, updatedBy);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_codes_1.default.OK,
        message: "Parcel is out for delivery",
        data: result,
    });
}));
// ! confirm parcel delivered by (receiver)
const confirmDelivery = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const receiverId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
    const { id } = req.params;
    const result = yield parcel_service_1.ParcelServices.confirmParcelDelivery(id, receiverId);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_codes_1.default.OK,
        message: "Parcel marked as delivered",
        data: result,
    });
}));
// ! incoming parcel (RECEIVER)
const getIncomingParcels = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const receiverId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
    const result = yield parcel_service_1.ParcelServices.findIncomingParcels(receiverId);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_codes_1.default.OK,
        message: "Incoming parcels retrieved successfully",
        data: result,
    });
}));
// ! Delivery history (RECEIVER)
const getDeliveryHistory = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const receiverId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
    const result = yield parcel_service_1.ParcelServices.findDeliveredParcels(receiverId);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_codes_1.default.OK,
        message: "Delivery history retrieve successfully",
        data: result,
    });
}));
// ! Get all parcel (ADMIN)
const getAllParcelsByAdmin = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield parcel_service_1.ParcelServices.getAllParcelsByAdminFromDB();
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_codes_1.default.OK,
        message: "All parcels retrieved successfully",
        data: result,
    });
}));
// ! block parcel by (ADMIN)
const blockParcel = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { parcelId } = req.params;
    const result = yield parcel_service_1.ParcelServices.blockParcelsByAdmin(parcelId);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_codes_1.default.OK,
        message: "Parcel Blocked successfully",
        data: result,
    });
}));
// ! unblock parcel by (ADMIN)
const unblockParcel = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { parcelId } = req.params;
    const result = yield parcel_service_1.ParcelServices.unblockParcelsByAdmin(parcelId);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_codes_1.default.OK,
        message: "Parcel unblocked successfully",
        data: result,
    });
}));
//! track parcel by trackingId
const trackParcel = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { trackingId } = req.params;
    const result = yield parcel_service_1.ParcelServices.trackParcel(trackingId);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_codes_1.default.OK,
        message: "Parcel tracking info retrieve successfully",
        data: result,
    });
}));
exports.ParcelControllers = {
    createParcel,
    getAllMyParcel,
    cancelParcel,
    statusLog,
    parcelDispatch,
    parcelInTransit,
    parcelOUtForDelivery,
    confirmDelivery,
    getIncomingParcels,
    getDeliveryHistory,
    getAllParcelsByAdmin,
    blockParcel,
    unblockParcel,
    trackParcel
};
