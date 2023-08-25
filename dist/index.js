"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const typeorm_1 = require("typeorm");
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const tasks_entity_1 = require("./src/tasks/tasks.entity");
const tasks_router_1 = require("./src/tasks/tasks.router");
// Instantiate express app
const app = (0, express_1.default)();
dotenv_1.default.config();
// Parse request Body -> process incoming json and convert to js obj
const allowCrossDomain = (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
};
app.use(allowCrossDomain);
app.use(body_parser_1.default.json());
// Use CORS install types as well
app.use((0, cors_1.default)());
// Create Database Connection
exports.AppDataSource = new typeorm_1.DataSource({
    type: 'mysql',
    url: process.env.DATABASE_URI,
    logging: false,
    entities: [tasks_entity_1.Task],
    synchronize: true, // Create tables in database and delete tables that is removed from our code as well
});
// Define server port
const port = process.env.PORT;
exports.AppDataSource.initialize()
    .then(() => {
    // Start listening to request
    app.listen(port);
    console.log('Data Source has been initialized!');
})
    .catch((err) => {
    console.error('Error during Data Source initialization', err);
});
app.use('/', tasks_router_1.taskRouter); // Take default route and add task router to it
