import { Task } from './tasks.entity';
import { AppDataSource } from '../../index';
import { instanceToPlain } from 'class-transformer';

export class TasksController {
  constructor(
    private taskRepository = AppDataSource.getRepository(
      Task,
    ),
  ) {}

  public async getAll(): Promise<Task[]> {
    try {
      let allTasks: Task[] = await this.taskRepository.find(
        {
          order: {
            date: 'ASC',
          },
        },
      );
      
      // Convert Task object to plain instance
      allTasks = instanceToPlain(allTasks) as Task[];

      return allTasks;
    } catch (errors) {
      console.log(errors);
      throw errors;
    }
  }
}
