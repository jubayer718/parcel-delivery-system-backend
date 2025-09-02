"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.globalErrorHandler = void 0;
const env_1 = require("../config/env");
const AppError_1 = __importDefault(require("../errorHelpers/AppError"));
const globalErrorHandler = (err, req, res, next) => {
    let statusCode = 500;
    let message = `something went wrong ${err} from global error handler`;
    let envStack = env_1.envVars.NODE_ENV === 'development' ? err.stack : null;
    if (err instanceof AppError_1.default) {
        statusCode = err.statusCode;
        message = err.message;
        envStack = err.stack;
    }
    else if (err instanceof Error) {
        statusCode = 500;
        message = err.message;
    }
    res.status(statusCode).json({
        success: false,
        message: message,
        err,
        stack: envStack
    });
};
exports.globalErrorHandler = globalErrorHandler;
