import { Task } from './tasks.entity';
import { AppDataSource } from '../../index';
import {
  instanceToPlain,
  plainToInstance,
} from 'class-transformer';
import { Request } from 'express'; 
import { UpdateResult } from 'typeorm';

class TasksService {
  // Method for the get route : GET ALL TASKS
  public async getAll( 
  ): Promise<Task[]> {
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
      return allTasks
    } catch (error) {
      throw error
    }
  }

  // Method for the post route : CREATE NEW TASK
  public async create(
    req: Request, 
  ): Promise<Task> { 

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

      return createdTask;
    } catch (errors) {
      throw errors
    }
  }

  // Method for updating tasks
  public async update(
    req: Request, 
  ): Promise<UpdateResult> {
    // Grab result of validation based on request and save it
     

    // Find if tasks exists
    let task: Task | null;

    try {
      task = await AppDataSource.getRepository(
        Task,
      ).findOne({
        where: { id: req.body.id },
      });
    } catch (errors) {
      throw  'Internal Server Error' 
    }

    // Return 404 if task is null
    if (!task) {
      throw 'The task with given ID does not exist'
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

      return updatedTask;
    } catch (errors) {
      throw 'Internal Server Error'
    }

    // Convert updated task instance to an object
  }
}

export const TaskService =  new TasksService();
