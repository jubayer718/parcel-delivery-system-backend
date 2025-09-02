import express from 'express';
import { UserController } from './user.controler';
import { validateRequest } from '../../middlewares/validateRequest';
import { createUserZodSchema } from './user.validation';




const router = express.Router();

//register user
router.post(
  "/register",
  validateRequest(createUserZodSchema),
  UserController.createUser
)



export const UserRoutes = router;