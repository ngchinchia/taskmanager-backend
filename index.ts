import express, { Express, Request, Response } from "express";

// Instantiate express app
const app: Express = express();

// Define server port
const port = 3200;

// Create default route
app.get("/", (req: Request, res: Response) => {
  res.send("Express + Typescript Server");
});

// Start listening to request
app.listen(port);
