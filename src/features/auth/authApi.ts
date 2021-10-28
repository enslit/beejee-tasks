import { BeeJeeApi, ResponseBeeJeeApi } from '../../utils/api/BeeJeeApi';
import { LoginForm } from './models/LoginForm';

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
        developer: 'Enslit',
      },
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
  }
}

const authApi = new AuthApi('/login');

export default authApi;
