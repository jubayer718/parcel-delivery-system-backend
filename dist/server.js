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
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const app_1 = __importDefault(require("./app"));
const env_1 = require("./app/config/env");
dotenv_1.default.config();
let server;
const startServer = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield mongoose_1.default.connect(env_1.envVars.MONGODB_URI);
        console.log("Connected to MongoDB");
        server = app_1.default.listen(env_1.envVars.PORT, () => {
            console.log(`Server is running on port ${env_1.envVars.PORT}`);
        });
    }
    catch (error) {
        console.error("Failed to connect to MongoDB", error);
    }
});
(() => __awaiter(void 0, void 0, void 0, function* () {
    yield startServer();
    // await seedSuperAdmin();
}))();
process.on("SIGTERM", () => {
    console.log("SIGTERM received");
    if (server) {
        server.close(() => {
            console.log("Server closed");
            process.exit(1);
        });
    }
});
process.on("SIGINT", () => {
    console.log("SIGINT received");
    if (server) {
        server.close(() => {
            console.log("Server closed");
            process.exit(1);
        });
    }
});
process.on('unhandledRejection', () => {
    if (server) {
        server.close(() => {
            console.log('Server closed due to unhandled promise rejection');
            process.exit(1);
        });
    }
    else {
        process.exit(1);
    }
});
process.on("uncaughtException", () => {
    if (server) {
        server.close(() => {
            console.log('Server closed due to uncaught exception');
            process.exit(1);
        });
    }
    else {
        process.exit(1);
    }
});
