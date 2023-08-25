"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.taskRouter = void 0;
const express_1 = require("express");
const tasks_controller_1 = require("./tasks.controller");
const tasks_validator_1 = require("./tasks.validator");
/* Fire router function */
exports.taskRouter = (0, express_1.Router)();
// Create default route to get all task
exports.taskRouter.get('/tasks', tasks_controller_1.taskController.getAll);
// Create post route to create a new task
exports.taskRouter.post('/tasks', tasks_validator_1.createValidator, tasks_controller_1.taskController.create);
// Update post route to update a task
exports.taskRouter.put('/tasks', tasks_validator_1.updateValidator, tasks_controller_1.taskController.update);
