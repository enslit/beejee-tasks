import { BeeJeeApi, ResponseBeeJeeApi } from '../../utils/api/BeeJeeApi';
import { Task } from './models/Task';
import { AddTaskRequestForm } from './models/AddTaskRequestForm';
import { DEVELOPER_NAME } from '../../app/constants/app';
import { TaskStatus } from './models/TaskStatus';

class TasksApi extends BeeJeeApi {
  private readonly subUrl: string;

  constructor(subUrl: string) {
    super();
    this.subUrl = subUrl;
  }

  public getTasks(
    page: number,
    sort_field: keyof Task,
    sort_direction: 'asc' | 'desc'
  ) {
    return this.fetch<ResponseBeeJeeApi>(`${this.subUrl}`, 'GET', {
      queryParams: {
        developer: DEVELOPER_NAME,
        page,
        sort_field,
        sort_direction,
      },
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  public create(form: AddTaskRequestForm) {
    return this.fetch<ResponseBeeJeeApi, AddTaskRequestForm>(
      `${this.subUrl}create`,
      'POST',
      {
        body: form,
        queryParams: {
          developer: DEVELOPER_NAME,
        },
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );
  }

  public complete(id: number, isAdmin: boolean, token: string) {
    return this.fetch<ResponseBeeJeeApi, { status: TaskStatus; token: string }>(
      `${this.subUrl}edit/${id}`,
      'POST',
      {
        body: {
          token,
          status: isAdmin ? TaskStatus.CompletedAdmin : TaskStatus.Completed,
        },
        queryParams: {
          developer: DEVELOPER_NAME,
        },
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );
  }

  public change(id: number, text: string, token: string) {
    return this.fetch<ResponseBeeJeeApi, { text: string; token: string }>(
      `${this.subUrl}edit/${id}`,
      'POST',
      {
        body: {
          token,
          text,
        },
        queryParams: {
          developer: DEVELOPER_NAME,
        },
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );
  }
}

const tasksApi = new TasksApi('/');

export default tasksApi;
