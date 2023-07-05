import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

const axiosClient = axios.create();

const BASE_API = 'http://localhost:3000';
const mock = new MockAdapter(axiosClient);

export { axiosClient, BASE_API, mock };
