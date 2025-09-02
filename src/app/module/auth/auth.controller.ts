import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { AuthServices } from "./auth.service";
import httpStatus from 'http-status-codes';
import { sendResponse } from "../../utils/sendResponse";
import { setAuthCookie } from "../../utils/setAuthCookie";

const credentialLogin = catchAsync(
  async (req: Request, res: Response, next:NextFunction) => {
    const loginInfo = await AuthServices.credentialLogin(req.body)

     setAuthCookie(res, loginInfo)

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "User Logged In Successfully",
        data: loginInfo,
    })
  }
)


export const AuthController = {
  credentialLogin
}