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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthServices = void 0;
const AppError_1 = __importDefault(require("../../errorHelpers/AppError"));
const user_model_1 = require("../user/user.model");
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const userToken_1 = require("../../utils/userToken");
const env_1 = require("../../config/env");
const credentialLogin = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const userExist = yield user_model_1.User.findOne({ email: payload.email });
    if (!userExist) {
        throw new AppError_1.default(http_status_codes_1.default.NOT_FOUND, "User not found");
    }
    ;
    const matchPassword = yield bcryptjs_1.default.compare(payload.password, userExist.password);
    if (!matchPassword) {
        throw new AppError_1.default(http_status_codes_1.default.BAD_REQUEST, "Invalid Credential");
    }
    ;
    const userTokens = (0, userToken_1.createUserToken)(userExist);
    const _a = userExist.toObject(), { password: pass } = _a, rest = __rest(_a, ["password"]);
    return {
        accessToken: userTokens.accessToken,
        refreshToken: userTokens.refreshToken,
        user: rest,
    };
});
const getNewAccessToken = (refreshToken) => __awaiter(void 0, void 0, void 0, function* () {
    const accessToken = yield (0, userToken_1.createNewAccessTokenWithRefreshToken)(refreshToken);
    // const verifiedRefreshToken = verifyToken(
    //     refreshToken,
    //     envVars.JWT_REFRESH_SECRET
    // ) as JwtPayload;
    // const isUserExist = await User.findOne({
    //     email: verifiedRefreshToken.email,
    // });
    // if (!isUserExist) {
    //     throw new AppError(httpStatus.BAD_REQUEST, "User dose not exist");
    // }
    // if (isUserExist.isBlocked) {
    //     throw new AppError(httpStatus.BAD_REQUEST, "User is blocked");
    // }
    // const payload = {
    //     userId: isUserExist._id,
    //     email: isUserExist.email,
    //     role: isUserExist.role,
    // };
    // const accessToken = generateToken(
    //     payload,
    //     envVars.JWT_ACCESS_SECRET,
    //     envVars.JWT_ACCESS_EXPIRES
    // );
    return accessToken;
});
// const changePassword = async (
//     oldPassword: string,
//     newPassword: string,
//     userId: string
// ) => {
//     const user = await User.findById(userId);
//     if (!user) {
//         throw new AppError(httpStatus.NOT_FOUND, "User not found");
//     }
//     const isPasswordMatch = await bcrypt.compare(oldPassword, user.password as string);
//     if (!isPasswordMatch) {
//         throw new AppError(httpStatus.BAD_REQUEST, "Password dose not match");
//     }
//     const hashedPassword = await bcrypt.hash(
//         newPassword,
//         Number(envVars.BCRYPT_SALT_ROUND)
//     );
//     user.password = newPassword;
//     await user.save();
// };
const resetPassword = (oldPassword, newPassword, decodedToken) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.findById(decodedToken.userId);
    const isOldPasswordMatch = yield bcryptjs_1.default.compare(oldPassword, user.password);
    if (!isOldPasswordMatch) {
        throw new AppError_1.default(http_status_codes_1.default.UNAUTHORIZED, "Old Password does not match");
    }
    user.password = yield bcryptjs_1.default.hash(newPassword, Number(env_1.envVars.BCRYPT_SALT_ROUND));
    user.save();
});
exports.AuthServices = {
    credentialLogin,
    getNewAccessToken,
    resetPassword,
};
