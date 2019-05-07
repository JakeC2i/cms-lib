export interface LoginState<T = any> {
  loggedIn: boolean;
  user?: T;
}
