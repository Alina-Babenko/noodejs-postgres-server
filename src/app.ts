import express, { Express, Request, Response } from "express";
import { ErrorHandler } from "./http/middlewares/ErrorHandler";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import bodyParser from "body-parser";
import cors from "cors";
import authRoute from "./routes/authRoutes";
import authorsRoute from "./routes/authorsRoutes";
import postsRoute from "./routes/postsRoute";
import swaggerOptions from "./swaggerConfig";

const app: Express = express();
const swaggerSpec = swaggerJsdoc(swaggerOptions);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/auth", authRoute);
app.use("/authors", authorsRoute);
app.use("/posts", postsRoute);

app.use("*", (req: Request, res: Response) => {
  return res.status(404).json({
	success: false,
	message: "Invalid route",
  });
});

app.use(ErrorHandler.handleErrors);

export default app;
