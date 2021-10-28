import { BaseApi } from './BaseApi';

export interface ResponseBeeJeeApi {
  status: 'ok' | 'error';
  massage?: Record<string, string>;
}

export class BeeJeeApi extends BaseApi {
  constructor() {
    super('https://uxcandy.com/~shapoval/test-task-backend/v2');
  }
}
