import axios, {Method} from 'axios';

type Options = {
  headers?: {[x: string]: string};
  method: Method;
  data?: any;
  params?: any;
  signal?: AbortSignal;
};

export default class ClientBase {
  requestHeaders: {[x: string]: string} = {};
  urlVersion = '/api';
  token = '';

  constructor() {}

  getBaseRoute = () => {
    return `http://192.168.2.109:4000/api`;
  };

  getOptions = (options: Options) => {
    const newOptions: Options = {...options};

    const headers: {[x: string]: string} = {...this.requestHeaders};

    return {...newOptions, headers};
  };

  doFetch = async <T>(url: string, options: Options): Promise<T> => {
    try {
      const response = await axios<T>(url, {
        ...this.getOptions(options),
      });

      return response.data;
    } catch (error: any) {
      return Promise.reject(
        error.response?.data ? error.response.data : error.response,
      );
    }
  };
}
