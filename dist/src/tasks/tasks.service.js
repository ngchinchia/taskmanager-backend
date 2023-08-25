"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskService = void 0;
const tasks_entity_1 = require("./tasks.entity");
const index_1 = require("../../index");
const class_transformer_1 = require("class-transformer");
class TasksService {
    // Method for the get route : GET ALL TASKS
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            let allTasks;
            try {
                allTasks = yield index_1.AppDataSource.getRepository(tasks_entity_1.Task).find({
                    order: {
                        date: 'ASC',
                    },
                });
                // Convert Task object to plain instance
                allTasks = (0, class_transformer_1.instanceToPlain)(allTasks);
                console.log(allTasks);
                return allTasks;
            }
            catch (error) {
                throw error;
            }
        });
    }
    // Method for the post route : CREATE NEW TASK
    create(req) {
        return __awaiter(this, void 0, void 0, function* () {
            // Create new instance of a task
            const newTask = new tasks_entity_1.Task();
            // Add required properties to the Task object
            newTask.title = req.body.title;
            newTask.date = req.body.date;
            newTask.description = req.body.description;
            newTask.priority = req.body.priority;
            newTask.status = req.body.status;
            // Add new task to the database
            let createdTask;
            try {
                createdTask = yield index_1.AppDataSource.getRepository(tasks_entity_1.Task).save(newTask);
                // Convert the task instance to an object
                createdTask = (0, class_transformer_1.instanceToPlain)(createdTask);
                return createdTask;
            }
            catch (errors) {
                throw errors;
            }
        });
    }
    // Method for updating tasks
    update(req) {
        return __awaiter(this, void 0, void 0, function* () {
            // Grab result of validation based on request and save it
            // Find if tasks exists
            let task;
            try {
                task = yield index_1.AppDataSource.getRepository(tasks_entity_1.Task).findOne({
                    where: { id: req.body.id },
                });
            }
            catch (errors) {
                throw 'Internal Server Error';
            }
            // Return 404 if task is null
            if (!task) {
                throw 'The task with given ID does not exist';
            }
            // Declare var for updated task
            let updatedTask;
            // Update the task
            try {
                updatedTask = yield index_1.AppDataSource.getRepository(tasks_entity_1.Task).update(req.body.id, (0, class_transformer_1.plainToInstance)(tasks_entity_1.Task, {
                    status: req.body.status,
                }));
                updatedTask = (0, class_transformer_1.instanceToPlain)(updatedTask);
                return updatedTask;
            }
            catch (errors) {
                throw 'Internal Server Error';
            }
            // Convert updated task instance to an object
        });
    }
}
exports.TaskService = new TasksService();
