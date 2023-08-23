import { Router, Response, Request } from 'express';
import { TasksController } from './tasks.controller';

/* Fire router function */
export const taskRouter: Router = Router();

// Create default route
taskRouter.get('/tasks', (req: Request, res: Response) => {
  const taskController = new TasksController();
  res.send(taskController.getAll());
});
