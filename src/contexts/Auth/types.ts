export interface IUser {
  username: string;
  name: string;
  avatar_url: string;
  token: string;
}

export interface IAuthContext {
  isAuthed: boolean;
  user?: IUser | null;
  token?: string;
  login: (username: string, password: string) => Promise<void>;
  logout: (username: string) => Promise<void> | void;
}
