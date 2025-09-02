import dotenv from 'dotenv';

dotenv.config();

interface EnvConfig{
  MONGODB_URI: string,
  NODE_ENV: "development" | "production",
  PORT: string,
  BCRYPT_SALT_ROUND: string,
  JWT_ACCESS_SECRET: string,
  JWT_ACCESS_EXPIRES:string,
  JWT_REFRESH_SECRET: string,
  JWT_REFRESH_EXPIRES:string,
}


const LoadEnvVariables = ():EnvConfig => {
  const requiredEnvVariables: string[] = ["PORT", "MONGODB_URI", "NODE_ENV","BCRYPT_SALT_ROUND","JWT_ACCESS_SECRET","JWT_ACCESS_EXPIRES","JWT_REFRESH_SECRET","JWT_REFRESH_EXPIRES"];

  requiredEnvVariables.forEach((variable) => {
    if (!process.env[variable]) {
      throw new Error(`Missing environment variable: ${variable}`)
    }
  });

  return {
    PORT: process.env.PORT as string,
    MONGODB_URI: process.env.MONGODB_URI as string,
    NODE_ENV: process.env.NODE_ENV as 'development' | 'production',
    BCRYPT_SALT_ROUND: process.env.BCRYPT_SALT_ROUND as string,
    JWT_ACCESS_SECRET :process.env.JWT_ACCESS_SECRET as string,
    JWT_ACCESS_EXPIRES :process.env.JWT_ACCESS_EXPIRES as string,
    JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET as string,
    JWT_REFRESH_EXPIRES:process.env.JWT_REFRESH_EXPIRES as string
  }
}

export const envVars = LoadEnvVariables();