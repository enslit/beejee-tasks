import { LoginForm } from './models/LoginForm';

export enum AuthActionTypes {
  Login = 'LOGIN',
  Logout = 'LOGOUT',
}

const login = (form: LoginForm) => ({
  type: AuthActionTypes.Login,
  payload: form,
});
const logout = () => ({ type: AuthActionTypes.Logout });

export const AuthSagaActions = {
  login,
  logout,
};
