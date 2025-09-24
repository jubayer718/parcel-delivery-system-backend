import express, { Request, Response } from "express";
import cors from "cors";
import { router } from "./app/routes";
import notfound from "./app/middlewares/notFound";
import { globalErrorHandler } from "./app/middlewares/globalErrorHandler";
import cookieParser from "cookie-parser";
const app = express();


app.use(cookieParser())
app.use(cors({
  origin: ["http://localhost:3000","https://parcel-delivery-one.vercel.app"],
  credentials:true
}));
app.use(express.json());
app.use('/api/v1', router);

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({ message: 'Parcel delivery system' });
})


app.use(globalErrorHandler);
app.use(notfound)

export default app;