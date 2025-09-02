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
exports.UserService = void 0;
const env_1 = require("../../config/env");
const AppError_1 = __importDefault(require("../../errorHelpers/AppError"));
const user_model_1 = require("./user.model");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const createUserIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isUserExist = yield user_model_1.User.findOne({ email: payload.email });
    if (isUserExist) {
        throw new AppError_1.default(http_status_codes_1.default.FORBIDDEN, "User already exist");
    }
    const hashedPassword = yield bcryptjs_1.default.hash(payload.password, Number(env_1.envVars.BCRYPT_SALT_ROUND));
    const authProvider = { provider: "credentials", providerId: payload.email };
    const user = yield user_model_1.User.create(Object.assign(Object.assign({}, payload), { password: hashedPassword, auths: [authProvider] }));
    return user;
});
const getAllUsersFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield user_model_1.User.find();
    const totalUsers = yield user_model_1.User.countDocuments();
    return { data: users, meta: { total: totalUsers } };
});
const blockUserByAdmin = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.findOne({ _id: userId });
    if (!user) {
        throw new AppError_1.default(http_status_codes_1.default.NOT_FOUND, "User not found");
    }
    if (user.isBlocked) {
        throw new AppError_1.default(http_status_codes_1.default.CONFLICT, "User already blocked");
    }
    user.isBlocked = true;
    yield user.save();
    return user;
});
const unblockUserByAdmin = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.findOne({ _id: userId });
    if (!user) {
        throw new AppError_1.default(http_status_codes_1.default.NOT_FOUND, "User not found");
    }
    if (!user.isBlocked) {
        throw new AppError_1.default(http_status_codes_1.default.CONFLICT, "User already unblocked");
    }
    user.isBlocked = false;
    yield user.save();
    return user;
});
exports.UserService = {
    createUserIntoDB,
    getAllUsersFromDB,
    blockUserByAdmin,
    unblockUserByAdmin
};
