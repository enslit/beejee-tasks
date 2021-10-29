import { BaseApi } from './BaseApi';
import { LOCAL_STORAGE_TOKEN_KEY } from '../../app/constants/app';
import { Token } from '../../features/auth/models/Token';

export interface ResponseBeeJeeApi {
  status: 'ok' | 'error';
  massage?: Record<string, string>;
}

export class BeeJeeApi extends BaseApi {
  constructor() {
    super('https://uxcandy.com/~shapoval/test-task-backend/v2');
  }

  static getAuthToken = async () => {
    const token = localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY);
    if (token) {
      const jsonToken: Token = await JSON.parse(token);
      if (jsonToken?.expiresDate > Date.now()) {
        return jsonToken.token;
      }
    }

    return null;
  };
}
