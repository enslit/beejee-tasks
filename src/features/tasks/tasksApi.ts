import { BeeJeeApi, ResponseBeeJeeApi } from '../../utils/api/BeeJeeApi';

class TasksApi extends BeeJeeApi {
  private readonly subUrl: string;

  constructor(subUrl: string) {
    super();
    this.subUrl = subUrl;
  }

  public getTasks(page: number) {
    return this.fetch<ResponseBeeJeeApi>(`${this.subUrl}`, 'GET', {
      queryParams: {
        developer: 'test',
        page: page,
        sort_field: 'id',
        sort_direction: 'desc',
      },
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}

const tasksApi = new TasksApi('/');

export default tasksApi;
