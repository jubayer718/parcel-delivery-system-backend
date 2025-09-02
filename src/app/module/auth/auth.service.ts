import AppError from "../../errorHelpers/AppError";
import { IUser } from "../user/user.interface";
import { User } from "../user/user.model";
import httpStatus from 'http-status-codes';
import bcrypt from 'bcryptjs';
import { createNewAccessTokenWithRefreshToken, createUserToken } from "../../utils/userToken";
import { envVars } from "../../config/env";
import { JwtPayload } from "jsonwebtoken";

const credentialLogin = async (payload: Partial<IUser>) => {
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

  const { password :pass , ...rest } = userExist.toObject();

  return {
    accessToken: userTokens.accessToken,
    refreshToken: userTokens.refreshToken,
    user:rest,
  }

}


const getNewAccessToken = async (refreshToken: string) => {
    const accessToken = await createNewAccessTokenWithRefreshToken(
        refreshToken
    );
    // const verifiedRefreshToken = verifyToken(
    //     refreshToken,
    //     envVars.JWT_REFRESH_SECRET
    // ) as JwtPayload;

    // const isUserExist = await User.findOne({
    //     email: verifiedRefreshToken.email,
    // });

    // if (!isUserExist) {
    //     throw new AppError(httpStatus.BAD_REQUEST, "User dose not exist");
    // }

    // if (isUserExist.isBlocked) {
    //     throw new AppError(httpStatus.BAD_REQUEST, "User is blocked");
    // }

    // const payload = {
    //     userId: isUserExist._id,
    //     email: isUserExist.email,
    //     role: isUserExist.role,
    // };

    // const accessToken = generateToken(
    //     payload,
    //     envVars.JWT_ACCESS_SECRET,
    //     envVars.JWT_ACCESS_EXPIRES
    // );

    return accessToken;
};



// const changePassword = async (
//     oldPassword: string,
//     newPassword: string,
//     userId: string
// ) => {
//     const user = await User.findById(userId);
//     if (!user) {
//         throw new AppError(httpStatus.NOT_FOUND, "User not found");
//     }
//     const isPasswordMatch = await bcrypt.compare(oldPassword, user.password as string);
//     if (!isPasswordMatch) {
//         throw new AppError(httpStatus.BAD_REQUEST, "Password dose not match");
//     }
//     const hashedPassword = await bcrypt.hash(
//         newPassword,
//         Number(envVars.BCRYPT_SALT_ROUND)
//     );
//     user.password = newPassword;
//     await user.save();
// };


const resetPassword = async (oldPassword: string, newPassword: string, decodedToken:JwtPayload) => {

    const user = await User.findById(decodedToken.userId)

    const isOldPasswordMatch = await bcrypt.compare(oldPassword, user!.password as string)
    if (!isOldPasswordMatch) {
        throw new AppError(httpStatus.UNAUTHORIZED, "Old Password does not match");
    }

    user!.password = await bcrypt.hash(newPassword, Number(envVars.BCRYPT_SALT_ROUND))

    user!.save();


}

export const AuthServices = {
  credentialLogin,
   getNewAccessToken,
    resetPassword,
}