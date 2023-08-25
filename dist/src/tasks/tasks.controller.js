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
exports.taskController = void 0;
const express_validator_1 = require("express-validator");
const tasks_service_1 = require("./tasks.service");
class TasksController {
    // Method for the get route : GET ALL TASKS
    getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const errors = (0, express_validator_1.validationResult)(req);
            if (!errors.isEmpty()) {
                return res
                    .status(400)
                    .json({ errors: errors.array() });
            }
            try {
                const allTasks = yield tasks_service_1.TaskService.getAll();
                return res.json(allTasks).status(200);
            }
            catch (_errors) {
                return res.json({ error: _errors }).status(500);
            }
        });
    }
    // Method for the post route : CREATE NEW TASK
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // Grab result of validation based on request and save it
            const errors = (0, express_validator_1.validationResult)(req);
            if (!errors.isEmpty()) {
                return res
                    .status(400)
                    .json({ errors: errors.array() });
            }
            try {
                const createdTask = yield tasks_service_1.TaskService.create(req);
                return res.json(createdTask).status(201);
            }
            catch (errors) {
                return res.json({ error: errors }).status(500);
            }
        });
    }
    // Method for updating tasks
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // Grab result of validation based on request and save it
            const errors = (0, express_validator_1.validationResult)(req);
            if (!errors.isEmpty()) {
                return res
                    .status(400)
                    .json({ errors: errors.array() });
            }
            try {
                const updatedTask = yield tasks_service_1.TaskService.update(req);
                return res.json(updatedTask).status(200);
            }
            catch (errors) {
                return res.json({ error: errors }).status(500);
            }
            // Convert updated task instance to an object
        });
    }
}
exports.taskController = new TasksController();
