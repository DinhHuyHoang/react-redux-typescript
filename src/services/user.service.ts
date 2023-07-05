import BaseAPIService from './base.service';

export default class UserService extends BaseAPIService {
  apiBase: string | undefined;
  rootEndpoint: string;

  constructor(apiBase?: string) {
    super();
    this.rootEndpoint = '/api/users';
    if (apiBase) this.apiBase = apiBase;
  }

  async getAll() {
    try {
      const res = await super.get({ apiBase: this.apiBase, endpoint: `${this.rootEndpoint}` });

      return res.data;
    } catch (err: any) {
      console.log(`${this.constructor.name}::getAll `, err);
      throw new Error(err.message);
    }
  }

  async getById(payload: { id: number }) {
    try {
      const endpoint = `${this.rootEndpoint}/${payload.id}`;
      const res = await super.get({ apiBase: this.apiBase, endpoint });

      return res.data;
    } catch (err: any) {
      console.log(`${this.constructor.name}::getById `, err);
      throw new Error(err.message);
    }
  }
}
