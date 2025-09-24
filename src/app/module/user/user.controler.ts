import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { UserService } from "./user.service";
import httpStatus from 'http-status-codes'
import { sendResponse } from "../../utils/sendResponse";
import { JwtPayload } from "jsonwebtoken";



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

const getAllUsers = catchAsync(async (req: Request, res: Response) => {
    const data = await UserService.getAllUsersFromDB();
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "All user retrieve successfully",
        data: data.data,
        meta: data.meta,
    });
});

const getMe = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const decodedToken = req.user as JwtPayload
    const result = await UserService.getMe(decodedToken.userId);

    // res.status(httpStatus.OK).json({
    //     success: true,
    //     message: "All Users Retrieved Successfully",
    //     data: users
    // })
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: "Your profile Retrieved Successfully",
        data: result.data
    })
})
const blockUser = catchAsync(async (req: Request, res: Response) => {
    const { userId } = req.params;
    const result = await UserService.blockUserByAdmin(userId);
    sendResponse(res, {
        success: true,
        message: "User has been blocked successfully",
        statusCode: httpStatus.OK,
        data: result,
    });
});

const unblockUser = catchAsync(async (req: Request, res: Response) => {
    const { userId } = req.params;
    const result = await UserService.unblockUserByAdmin(userId);
    sendResponse(res, {
        success: true,
        message: "User has been unblocked successfully",
        statusCode: httpStatus.OK,
        data: result,
    });
});

export const UserController = {
  createUser,
  getAllUsers,
  blockUser,
  unblockUser,
  getMe
}