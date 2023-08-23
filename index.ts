import express, {
  Express,
  Request,
  Response,
} from 'express';
import dotenv from 'dotenv';
import { DataSource } from 'typeorm';

// Instantiate express app
const app: Express = express();
dotenv.config();

// Create Database Connection
export const AppDataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DB,
  synchronize: true, // Create tables in database and delete tables that is removed from our code as well
});

// Define server port
const port = process.env.PORT;

// Create default route
app.get('/', (req: Request, res: Response) => {
  res.send('Express + Typescript Server');
});

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
