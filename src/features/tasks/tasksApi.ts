import { BeeJeeApi, ResponseBeeJeeApi } from '../../utils/api/BeeJeeApi';
import { Task } from './models/Task';
import { AddTaskRequestForm } from './models/AddTaskRequestForm';
import { TaskStatus } from './models/TaskStatus';

class TasksApi extends BeeJeeApi {
  public getTasks(
    page: number,
    sort_field: keyof Task,
    sort_direction: 'asc' | 'desc'
  ) {
    return this.fetch<ResponseBeeJeeApi>(`/`, 'GET', {
      queryParams: {
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
      `/create`,
      'POST',
      {
        body: form,
      }
    );
  }

  public complete(id: number, status: TaskStatus, token: string) {
    const body = {
      token,
      status: TaskStatus.Edited
        ? TaskStatus.CompletedEdited
        : TaskStatus.Completed,
    };

    return this.fetch<ResponseBeeJeeApi, { status: TaskStatus; token: string }>(
      `/edit/${id}`,
      'POST',
      { body }
    );
  }

  public change(id: number, text: string, token: string) {
    const body = {
      token,
      status: TaskStatus.Edited,
      text,
    };

    return this.fetch<ResponseBeeJeeApi, { text: string; token: string }>(
      `/edit/${id}`,
      'POST',
      { body }
    );
  }
}

const tasksApi = new TasksApi();

export default tasksApi;
