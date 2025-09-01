import express, { Request, Response } from "express";
import cors from "cors";
import { router } from "./app/routes";
import notfound from "./app/middlewares/notFound";
import { globalErrorHandler } from "./app/middlewares/globalErrorHandler";
const app = express();


app.use('/api/v1', router);

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({ message: 'Parcel delivery system' });
})


app.use(globalErrorHandler);
app.use(notfound)

export default app;