import { Task } from './tasks.entity';
import { AppDataSource } from '../../index';

export class TasksController {
  constructor(
    private taskRepository = AppDataSource.getRepository(
      Task,
    ),
  ) {}

  public async getAll(): Promise<Task[]> {
    try {
      const allTasks: Task[] = await this.taskRepository.find({
        order: {
          date: 'ASC',
        },
      });
      console.log(allTasks)
      return allTasks;
    } catch (errors) {
      console.log(errors);
      throw errors; 
    }
  }
}
