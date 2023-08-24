import { Router } from 'express';
import { taskController } from './tasks.controller';
import { createValidator, updateValidator } from './tasks.validator';


/* Fire router function */
export const taskRouter: Router = Router();

// Create default route to get all task
taskRouter.get('/tasks', taskController.getAll)
// Create post route to create a new task
taskRouter.post('/tasks',createValidator, taskController.create);
// Update post route to update a task
taskRouter.put('/tasks',updateValidator, taskController.update);
