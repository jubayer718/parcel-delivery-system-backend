"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParcelRoutes = void 0;
const express_1 = __importDefault(require("express"));
const parcel_controller_1 = require("./parcel.controller");
const validateRequest_1 = require("../../middlewares/validateRequest");
const parcel_validation_1 = require("./parcel.validation");
const user_interface_1 = require("../user/user.interface");
const checkAuth_1 = require("../../middlewares/checkAuth");
const router = express_1.default.Router();
// ! create new parcel
router.post("/", (0, checkAuth_1.checkAuth)(user_interface_1.Role.SENDER), (0, validateRequest_1.validateRequest)(parcel_validation_1.createParcelZodSchema), parcel_controller_1.ParcelControllers.createParcel);
// ! get all parcel
router.get("/me", (0, checkAuth_1.checkAuth)(user_interface_1.Role.SENDER), parcel_controller_1.ParcelControllers.getAllMyParcel);
// ! cancel parcel
router.patch("/cancel/:id", (0, checkAuth_1.checkAuth)(user_interface_1.Role.ADMIN, user_interface_1.Role.SENDER), parcel_controller_1.ParcelControllers.cancelParcel);
// ! dispatch parcel
router.patch("/dispatch/:id", (0, checkAuth_1.checkAuth)(user_interface_1.Role.ADMIN), parcel_controller_1.ParcelControllers.parcelDispatch);
// ! parcel in transit
router.patch("/in-transit/:id", (0, checkAuth_1.checkAuth)(user_interface_1.Role.ADMIN), parcel_controller_1.ParcelControllers.parcelInTransit);
// ! parcel in out for delivery
router.patch("/out-for-delivery/:id", (0, checkAuth_1.checkAuth)(user_interface_1.Role.ADMIN), parcel_controller_1.ParcelControllers.parcelOUtForDelivery);
// ! parcel delivered
// router.patch("/delivered/:id", ParcelControllers.parcelDelivered);
// ! confirm parcel delivered (receiver)
router.patch("/confirm-delivery/:id", (0, checkAuth_1.checkAuth)(user_interface_1.Role.RECEIVER), parcel_controller_1.ParcelControllers.confirmDelivery);
// ! get parcel status log
router.get("/:id/status-log", (0, checkAuth_1.checkAuth)(user_interface_1.Role.ADMIN, user_interface_1.Role.SENDER, user_interface_1.Role.RECEIVER), parcel_controller_1.ParcelControllers.statusLog);
// ! get incoming parcels (RECEIVER)
router.get("/incoming", (0, checkAuth_1.checkAuth)(user_interface_1.Role.RECEIVER), parcel_controller_1.ParcelControllers.getIncomingParcels);
// ! delivery history for (RECEIVER)
router.get("/history", (0, checkAuth_1.checkAuth)(user_interface_1.Role.RECEIVER), parcel_controller_1.ParcelControllers.getDeliveryHistory);
// ! get all parcel (ADMIN)
router.get("/", (0, checkAuth_1.checkAuth)(user_interface_1.Role.ADMIN), parcel_controller_1.ParcelControllers.getAllParcelsByAdmin);
// ! block parcel by (ADMIN)
router.patch("/block/:parcelId", (0, checkAuth_1.checkAuth)(user_interface_1.Role.ADMIN), parcel_controller_1.ParcelControllers.blockParcel);
// ! unblock parcel by (ADMIN)
router.patch("/unblock/:parcelId", (0, checkAuth_1.checkAuth)(user_interface_1.Role.ADMIN), parcel_controller_1.ParcelControllers.unblockParcel);
// ! track parcel by trackingId
router.get("/track/:trackingId", (0, checkAuth_1.checkAuth)(user_interface_1.Role.SENDER, user_interface_1.Role.RECEIVER, user_interface_1.Role.ADMIN), parcel_controller_1.ParcelControllers.trackParcel);
exports.ParcelRoutes = router;
