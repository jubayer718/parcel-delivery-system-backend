import { Types } from "mongoose";

export enum Role{
  ADMIN = "ADMIN",
  SENDER = "SENDER",
  RECEIVER = "RECEIVER",
}

export interface IAuths{
  provider: "google" | "credentials";
  providerId: string;
}

export interface IUser{
  _id?: Types.ObjectId;
  name: string;
  email: string;
  password?: string;
  phone?: string;
  role: Role;
  picture?: string;
  address?: string;
  auths: IAuths[];
  isBlocked?: boolean;

}