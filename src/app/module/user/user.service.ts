import { envVars } from "../../config/env";
import AppError from "../../errorHelpers/AppError";
import { IUser } from "./user.interface";
import { User } from "./user.model";
import bcrypt from 'bcryptjs';
import httpStatus from 'http-status-codes';

const createUserIntoDB = async (payload: IUser) => {
    const isUserExist = await User.findOne({ email: payload.email });
    if (isUserExist) {
        throw new AppError(httpStatus.FORBIDDEN, "User already exist");
    }
    const hashedPassword = await bcrypt.hash(
        payload.password as string,
        Number(envVars.BCRYPT_SALT_ROUND)
  );
  
  const authProvider = { provider: "credentials", providerId: payload.email };
  
    const user = await User.create({
        ...payload,
        password: hashedPassword,
        auths: [authProvider],
    });
    return user;
};

export const UserService = {
  createUserIntoDB
}