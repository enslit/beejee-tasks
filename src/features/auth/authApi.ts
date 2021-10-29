import { BeeJeeApi, ResponseBeeJeeApi } from '../../utils/api/BeeJeeApi';
import { LoginForm } from './models/LoginForm';
import { DEVELOPER_NAME } from '../../app/constants/app';

class AuthApi extends BeeJeeApi {
  private readonly subUrl: string;

  constructor(subUrl: string) {
    super();
    this.subUrl = subUrl;
  }

  public login(form: LoginForm) {
    return this.fetch<ResponseBeeJeeApi, LoginForm>(`${this.subUrl}`, 'POST', {
      body: form,
      queryParams: {
        developer: DEVELOPER_NAME,
      },
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
  }
}

const authApi = new AuthApi('/login');

export default authApi;
