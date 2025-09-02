"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createParcelZodSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.createParcelZodSchema = zod_1.default.object({
    weight: zod_1.default.string({ error: "Weigh must be string" }),
    price: zod_1.default.number({ error: "price must be number" }),
    receiverId: zod_1.default.string({ error: "sender must be string" }),
    originalAddress: zod_1.default.string({ error: "OriginalAddress must be string" }),
    destinationAddress: zod_1.default.string({
        error: "destinationAddress must be string",
    }),
});
