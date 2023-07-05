import _, { omit } from 'lodash';
import { AxiosHeaders } from 'axios';
import { axiosClient } from './axiosClient';
import './mocks';

interface IService {}

export type ServiceInput = {
  endpoint: string;
  apiBase?: string;
  headers?: AxiosHeaders;
  data?: any;
  params?: any;
};

const httpStatus = {
  '1xx': (status: number) => /^1+\d{2}$/g.test(status.toString()),
  '2xx': (status: number) => /^2+\d{2}$/g.test(status.toString()),
  '3xx': (status: number) => /^3+\d{2}$/g.test(status.toString()),
  '4xx': (status: number) => /^4+\d{2}$/g.test(status.toString()),
  '5xx': (status: number) => /^5+\d{2}$/g.test(status.toString()),
};

const method = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
  CONNECT: 'CONNECT',
  OPTIONS: 'OPTIONS',
  TRACE: 'TRACE',
  PATH: 'PATH',
};

async function handleErrors(response: any) {
  const { status } = response;

  if (!response.ok) {
    if (httpStatus['4xx'](status)) {
      // if ([401, 403].includes(status)) {
      //   window.iframeLogin.contentWindow.postMessage({ type: 'logout' }, '*');
      //   setTimeout(() => {
      //     window.location.reload();
      //   }, 1000);
      // }

      // if (status === 422) {
      //   let { message } = await response.json();
      //   const [link] = [...message.matchAll(/href="(.\S*)"/g)];
      //   message = message.replace(/,\ssee\s<a.*a>/g, '');

      //   throw Error(message);
      // }

      throw Error(response.statusText);
    }

    if (httpStatus['5xx'](status)) {
      const { error, message } = await response.json();

      // if (status === 500) {

      // }

      throw Error(message);
    }

    throw Error(response.statusText);
  }

  return response;
}

export default class BaseService implements IService {
  static token: string;
  static apiBase: string = 'http://localhost:3000';
  static headers = new AxiosHeaders();

  static setApiBaseAndToken(apiBase: string, token: string) {
    if (!apiBase || !token) throw new Error('apiBase and token params are required');

    BaseService.headers = new AxiosHeaders();
    BaseService.apiBase = apiBase;
    BaseService.token = token;
    BaseService.headers.append('Authorization', BaseService.token);
    BaseService.headers.append('Content-Type', 'application/json');
  }

  static setApiBase(apiBase: string) {
    if (!apiBase) throw new Error('apiBase is required');

    BaseService.headers = new AxiosHeaders();
    BaseService.apiBase = apiBase;
    BaseService.headers.append('Content-Type', 'application/json');
  }

  protected async get({ apiBase, headers, endpoint, params }: ServiceInput) {
    const API_BASE = apiBase || BaseService.apiBase;
    const finalHeaders = headers || BaseService.headers;

    return axiosClient({
      url: API_BASE + endpoint,
      method: method.GET,
      headers: finalHeaders,
      params: params,
    });
  }

  protected async post({ apiBase, headers, endpoint, data = {} }: ServiceInput) {
    const API_BASE = apiBase || BaseService.apiBase;
    const finalHeaders = headers || BaseService.headers;

    // return fetch(API_BASE + endpoint, {
    //   method: method.POST,
    //   headers: finalHeaders,
    //   body: _.isArray(data) ? JSON.stringify(data) : JSON.stringify(_.omitBy(data, _.isNil)),
    // }).then(handleErrors);

    return axiosClient({
      url: API_BASE + endpoint,
      method: method.POST,
      headers: finalHeaders,
      data: _.isArray(data) ? JSON.stringify(data) : JSON.stringify(_.omitBy(data, _.isNil)),
    });
  }

  protected async put({ apiBase, headers, endpoint, data = {} }: ServiceInput) {
    const API_BASE = apiBase || BaseService.apiBase;
    const finalHeaders = headers || BaseService.headers;

    // return fetch(API_BASE + endpoint, {
    //   method: method.PUT,
    //   headers: finalHeaders,
    //   body: _.isArray(data) ? JSON.stringify(data) : JSON.stringify(_.omitBy(data, _.isNil)),
    // }).then(handleErrors);

    return axiosClient({
      url: API_BASE + endpoint,
      method: method.PUT,
      headers: finalHeaders,
      data: _.isArray(data) ? JSON.stringify(data) : JSON.stringify(_.omitBy(data, _.isNil)),
    });
  }

  protected async delete({ apiBase, headers, endpoint }: ServiceInput) {
    const API_BASE = apiBase || BaseService.apiBase;
    const finalHeaders = headers || BaseService.headers;

    // const response = await fetch(API_BASE + endpoint, {
    //   method: method.DELETE,
    //   headers: finalHeaders,
    // });
    // return handleErrors(response);

    return axiosClient({
      url: API_BASE + endpoint,
      method: method.DELETE,
      headers: finalHeaders,
    });
  }

  protected async uploadFiles({ apiBase, headers, endpoint, data = {} }: ServiceInput) {
    const API_BASE = apiBase || BaseService.apiBase;
    const finalHeaders = {
      'Content-Type': 'multipart/form-data',
    };
    const formData = new FormData();
    formData.append('files', data.files);

    return axiosClient({
      url: API_BASE + endpoint,
      method: method.POST,
      headers: finalHeaders,
      data: formData,
    });
  }

  // postBuffer({ apiBase, headers, endpoint, data }) {
  //   const API_BASE = apiBase || BaseService.apiBase;
  //   const finalHeaders = headers || BaseService.headers;

  //   return fetch(API_BASE + endpoint, {
  //     method: method.POST,
  //     headers: finalHeaders,
  //     body: _.isArray(data) ? JSON.stringify(data) : JSON.stringify(_.omitBy(data, _.isNil)),
  //   })
  //     .then(handleErrors)
  //     .then((res) => res.arrayBuffer());
  // }
}
