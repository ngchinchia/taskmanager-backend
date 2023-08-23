import { Router, Response, Request } from 'express';
import { TasksController } from './tasks.controller';

/* Fire router function */
export const taskRouter: Router = Router();

// Create default route to get all task
taskRouter.get('/tasks', async (req: Request, res: Response) => {
  const taskController = new TasksController();
  const allTasks = await taskController.getAll()
  res.json(allTasks).status(200)
});

// taskRouter.post('/tasks', async (req: Request, res: Response) => {

// })
