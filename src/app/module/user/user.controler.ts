import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { UserService } from "./user.service";
import httpStatus from 'http-status-codes'
import { sendResponse } from "../../utils/sendResponse";



const createUser = catchAsync(async (req: Request, res: Response) => {
  const userData = req.body;
  
  const result = await UserService.createUserIntoDB(userData);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "User created Successfully",
    data: result,
  })


})

export const UserController = {
  createUser
}