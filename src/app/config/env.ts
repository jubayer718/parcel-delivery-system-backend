import dotenv from 'dotenv';

dotenv.config();

interface EnvConfig{
  MONGODB_URI: string,
  NODE_ENV: "development" | "production",
  PORT: string,
  BCRYPT_SALT_ROUND:string,
}


const LoadEnvVariables = ():EnvConfig => {
  const requiredEnvVariables: string[] = ["PORT", "MONGODB_URI", "NODE_ENV","BCRYPT_SALT_ROUND"];

  requiredEnvVariables.forEach((variable) => {
    if (!process.env[variable]) {
      throw new Error(`Missing environment variable: ${variable}`)
    }
  });

  return {
    PORT: process.env.PORT as string,
    MONGODB_URI: process.env.MONGODB_URI as string,
    NODE_ENV: process.env.NODE_ENV as 'development' | 'production',
    BCRYPT_SALT_ROUND:process.env.BCRYPT_SALT_ROUND as string,
  }
}

export const envVars = LoadEnvVariables();