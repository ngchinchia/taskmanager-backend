import express, {
  Express, NextFunction, Request, Response
} from 'express';
import dotenv from 'dotenv';
import { DataSource } from 'typeorm';
import cors from 'cors'
import bodyParser from 'body-parser';
import { Task } from './src/tasks/tasks.entity';
import { taskRouter } from './src/tasks/tasks.router';

// Instantiate express app
const app: Express = express();
dotenv.config();

// Parse request Body -> process incoming json and convert to js obj
const allowCrossDomain = (req: Request, res: Response, next: NextFunction) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
};
app.use(allowCrossDomain);

app.use(bodyParser.json())

// Use CORS install types as well
app.use(cors());

// Create Database Connection
export const AppDataSource = new DataSource({
  type: 'mysql',
  url: process.env.DATABASE_URI,
  logging: false, 
  entities: [Task], 
  synchronize: true, // Create tables in database and delete tables that is removed from our code as well
});

// Define server port
const port = process.env.PORT;



AppDataSource.initialize()
  .then(() => {
    // Start listening to request
    app.listen(port);
    console.log('Data Source has been initialized!');
  })
  .catch((err) => {
    console.error(
      'Error during Data Source initialization',
      err,
    );
  });

app.use('/', taskRouter) // Take default route and add task router to it
