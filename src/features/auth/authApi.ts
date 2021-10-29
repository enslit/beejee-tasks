import { BeeJeeApi, ResponseBeeJeeApi } from '../../utils/api/BeeJeeApi';
import { LoginForm } from './models/LoginForm';

class AuthApi extends BeeJeeApi {
  public login(form: LoginForm) {
    return this.fetch<ResponseBeeJeeApi, LoginForm>(`/login`, 'POST', {
      body: form,
    });
  }
}

const authApi = new AuthApi();

export default authApi;
