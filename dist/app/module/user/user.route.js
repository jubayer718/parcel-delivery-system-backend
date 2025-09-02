"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_controler_1 = require("./user.controler");
const validateRequest_1 = require("../../middlewares/validateRequest");
const user_validation_1 = require("./user.validation");
const user_interface_1 = require("./user.interface");
const checkAuth_1 = require("../../middlewares/checkAuth");
const router = express_1.default.Router();
//register user
router.post("/register", (0, validateRequest_1.validateRequest)(user_validation_1.createUserZodSchema), user_controler_1.UserController.createUser);
// ! get all user by admin
router.get("/all-users", (0, checkAuth_1.checkAuth)(user_interface_1.Role.ADMIN), user_controler_1.UserController.getAllUsers);
// ! block user by admin
router.patch("/block/:userId", (0, checkAuth_1.checkAuth)(user_interface_1.Role.ADMIN), user_controler_1.UserController.blockUser);
// ! unblock user by admin
router.patch("/unblock/:userId", (0, checkAuth_1.checkAuth)(user_interface_1.Role.ADMIN), user_controler_1.UserController.unblockUser);
exports.UserRoutes = router;
