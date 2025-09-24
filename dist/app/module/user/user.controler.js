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
exports.UserController = void 0;
const catchAsync_1 = require("../../utils/catchAsync");
const user_service_1 = require("./user.service");
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const sendResponse_1 = require("../../utils/sendResponse");
const createUser = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userData = req.body;
    const result = yield user_service_1.UserService.createUserIntoDB(userData);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_codes_1.default.CREATED,
        message: "User created Successfully",
        data: result,
    });
}));
const getAllUsers = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield user_service_1.UserService.getAllUsersFromDB();
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_codes_1.default.OK,
        message: "All user retrieve successfully",
        data: data.data,
        meta: data.meta,
    });
}));
const getMe = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const decodedToken = req.user;
    const result = yield user_service_1.UserService.getMe(decodedToken.userId);
    // res.status(httpStatus.OK).json({
    //     success: true,
    //     message: "All Users Retrieved Successfully",
    //     data: users
    // })
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_codes_1.default.CREATED,
        message: "Your profile Retrieved Successfully",
        data: result.data
    });
}));
const blockUser = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    const result = yield user_service_1.UserService.blockUserByAdmin(userId);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        message: "User has been blocked successfully",
        statusCode: http_status_codes_1.default.OK,
        data: result,
    });
}));
const unblockUser = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    const result = yield user_service_1.UserService.unblockUserByAdmin(userId);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        message: "User has been unblocked successfully",
        statusCode: http_status_codes_1.default.OK,
        data: result,
    });
}));
exports.UserController = {
    createUser,
    getAllUsers,
    blockUser,
    unblockUser,
    getMe
};
