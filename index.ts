import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";

// Instantiate express app
const app: Express = express();
dotenv.config()

// Define server port
const port = process.env.PORT;

// Create default route
app.get("/", (req: Request, res: Response) => {
  res.send("Express + Typescript Server");
});

// Start listening to request
app.listen(port);
