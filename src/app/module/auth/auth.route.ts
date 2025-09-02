import { Router } from "express";
import { AuthController } from "./auth.controller";
import { Role } from "../user/user.interface";
import { checkAuth } from "../../middlewares/checkAuth";



const router = Router();

router.post("/login", AuthController.credentialLogin);
router.post("/refresh-token", AuthController.getNewAccessToken);
router.post("/logout", AuthController.logout);
router.post(
    "/change-password",
    checkAuth(...Object.values(Role)),
    AuthController.resetPassword
);





export const AuthRoutes = router;