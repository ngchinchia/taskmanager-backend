import { Task } from './tasks.entity';
import { Response, Request } from 'express';
import { validationResult } from 'express-validator';
import { TaskService } from './tasks.service';

class TasksController {
  // Method for the get route : GET ALL TASKS
  public async getAll(
    req: Request,
    res: Response,
  ): Promise<Response> {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ errors: errors.array() });
    }

    try {
      const allTasks: Task[] = await TaskService.getAll();
      return res.json(allTasks).status(200);
    } catch (_errors) {
      return res.json({ error: _errors }).status(500);
    }
  }

  // Method for the post route : CREATE NEW TASK
  public async create(
    req: Request,
    res: Response,
  ): Promise<Response> {
    // Grab result of validation based on request and save it
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ errors: errors.array() });
    }

    try {
      const createdTask = await TaskService.create(req);

      return res.json(createdTask).status(201);
    } catch (errors) {
      return res.json({ error: errors }).status(500);
    }
  }

  // Method for updating tasks
  public async update(
    req: Request,
    res: Response,
  ): Promise<Response> {
    // Grab result of validation based on request and save it
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ errors: errors.array() });
    }

    try {
      const updatedTask = await TaskService.update(req);

      return res.json(updatedTask).status(200);
    } catch (errors) {
      return res.json({ error: errors }).status(500);
    }

    // Convert updated task instance to an object
  }
}

export const taskController = new TasksController();
