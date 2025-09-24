import express from 'express';
import { UserController } from './user.controler';
import { validateRequest } from '../../middlewares/validateRequest';
import { createUserZodSchema } from './user.validation';
import { Role } from './user.interface';
import { checkAuth } from '../../middlewares/checkAuth';




const router = express.Router();
//get user data
router.get("/me", checkAuth(...Object.values(Role)), UserController.getMe)
//register user
router.post(
  "/register",
  validateRequest(createUserZodSchema),
  UserController.createUser
)
// ! get all user by admin
router.get("/all-users", checkAuth(Role.ADMIN), UserController.getAllUsers);


// ! block user by admin
router.patch(
    "/block/:userId",
    checkAuth(Role.ADMIN),
    UserController.blockUser
);

// ! unblock user by admin
router.patch(
    "/unblock/:userId",
    checkAuth(Role.ADMIN),
    UserController.unblockUser
);
export const UserRoutes = router;