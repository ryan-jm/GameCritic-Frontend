import axios from 'axios';

const client = axios.create({
  baseURL: 'https://gamecritic.herokuapp.com/api/',
});

export async function validate(username: string, password: string) {
  const {
    data: { token },
  } = await client.post('auth', { username, password });
  setAuth(token);

  const {
    data: { user },
  } = await client.get(`users/${username}`);
  const currentUser = { ...user, token: token };
  return currentUser;
}

export function setAuth(token: string) {
  client.defaults.headers.common['token'] = token;
}
