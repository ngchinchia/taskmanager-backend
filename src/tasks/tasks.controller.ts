import { Task } from './tasks.entity';
import { AppDataSource } from '../../index';
import {
  instanceToPlain,
  plainToInstance,
} from 'class-transformer';
import { Response, Request } from 'express';
import { validationResult } from 'express-validator';
import { UpdateResult } from 'typeorm';

class TasksController {
  // Method for the get route : GET ALL TASKS
  public async getAll(
    req: Request,
    res: Response,
  ): Promise<Response> {
    let allTasks: Task[];

    try {
      allTasks = await AppDataSource.getRepository(
        Task,
      ).find({
        order: {
          date: 'ASC',
        },
      });

      // Convert Task object to plain instance
      allTasks = instanceToPlain(allTasks) as Task[];
      console.log(allTasks);
      return res.json(allTasks).status(200);
    } catch (_errors) {
      return res
        .json({ error: 'Internal Server Error' })
        .status(500);
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

    // Create new instance of a task
    const newTask = new Task();

    // Add required properties to the Task object
    newTask.title = req.body.title;
    newTask.date = req.body.date;
    newTask.description = req.body.description;
    newTask.priority = req.body.priority;
    newTask.status = req.body.status;

    // Add new task to the database
    let createdTask: Task;

    try {
      createdTask = await AppDataSource.getRepository(
        Task,
      ).save(newTask);

      // Convert the task instance to an object
      createdTask = instanceToPlain(createdTask) as Task;

      return res.json(createdTask).status(201);
    } catch (errors) {
      return res
        .json({ error: 'Internal Server Error' })
        .status(500);
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

    // Find if tasks exists
    let task: Task | null;

    try {
      task = await AppDataSource.getRepository(
        Task,
      ).findOne({
        where: { id: req.body.id },
      });
    } catch (errors) {
      return res
        .json({ error: 'Internal Server Error' })
        .status(500);
    }

    // Return 404 if task is null
    if (!task) {
      return res.status(404).json({
        error: 'The task with given ID does not exist',
      });
    }
    // Declare var for updated task
    let updatedTask: UpdateResult;

    // Update the task
    try {
      updatedTask = await AppDataSource.getRepository(
        Task,
      ).update(
        req.body.id,
        plainToInstance(Task, {
          status: req.body.status,
        }),
      );

      updatedTask = instanceToPlain(
        updatedTask,
      ) as UpdateResult;

      return res.json(updatedTask).status(200);
    } catch (errors) {
      return res
        .json({ error: 'Internal Server Error' })
        .status(500);
    }

    // Convert updated task instance to an object
  }
}

export const taskController = new TasksController();
