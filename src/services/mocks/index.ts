import { mock } from '../axiosClient';
import users from './user';
import channels from './channel';

mock.onGet(/api\/users$/).reply((config) => {
  return [200, users];
});

mock.onGet(/api\/users\/(\d+)$/).reply((config) => {
  const reg = new RegExp(/api\/users\/(\d+)$/, 'g');
  const found = reg.exec(config.url || '');
  const id = found ? found[1] : 0;

  return [200, users.find((user) => user.id === Number(id))];
});

mock.onGet(/api\/channels$/).reply((config) => {
  return [200, channels];
});

mock.onGet(/api\/channels\/(\d+)$/).reply((config) => {
  const reg = new RegExp(/api\/channels\/(\d+)$/, 'g');
  const found = reg.exec(config.url || '');
  const id = found ? found[1] : 0;

  return [200, users.find((channel) => channel.id === Number(id))];
});
