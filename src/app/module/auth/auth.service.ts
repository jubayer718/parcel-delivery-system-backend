import AppError from "../../errorHelpers/AppError";
import { IUser } from "../user/user.interface";
import { User } from "../user/user.model";
import httpStatus from 'http-status-codes';
import bcrypt from 'bcryptjs';
import { createUserToken } from "../../utils/userToken";

const userLogin = async (payload: Partial<IUser>) => {
  const userExist = await User.findOne({ email: payload.email });
  if (!userExist) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found")
  };

  const matchPassword = await bcrypt.compare(
    payload.password as string,
    userExist.password as string
  );
  
  if (!matchPassword) {
    throw new AppError(httpStatus.BAD_REQUEST, "Invalid Credential");
  };

  const userTokens = createUserToken(userExist);

  const { password, ...rest } = userExist.toObject();

  return {
    accessToken: userTokens.accessToken,
    refreshToken: userTokens.refreshToken,
    user:rest,
  }



}