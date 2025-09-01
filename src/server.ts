import { Server } from 'http';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import app from './app';
import { envVars } from './app/config/env';



dotenv.config();


let server: Server;


const startServer = async () => {
  try {

    await mongoose.connect(envVars.MONGODB_URI as string);
    console.log("Connected to MongoDB");
    server = app.listen(envVars.PORT, () => {
      console.log(`Server is running on port ${envVars.PORT}`)
    });
    
  } catch (error) {
    console.error("Failed to connect to MongoDB", error);
  }
}


(async ()=>{
  await startServer();
  // await seedSuperAdmin();
  
})()

process.on("SIGTERM", () => {
  console.log("SIGTERM received");
  if (server) {
    server.close(() => {
      console.log("Server closed");
      process.exit(1);
  })}
})


process.on("SIGINT", () => {
  console.log("SIGINT received")
  if (server) {
    server.close(() => {
      console.log("Server closed");
      process.exit(1);
    })
  }
})


process.on('unhandledRejection', () => {
  if (server) {
    server.close(() => {
      console.log('Server closed due to unhandled promise rejection');
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
})

process.on("uncaughtException", () => {
  if (server) {
    server.close(() => {
      console.log('Server closed due to uncaught exception');
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
})