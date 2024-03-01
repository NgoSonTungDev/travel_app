import {
  IFilterPost,
  IFormAddPost,
  IPost,
  IResponsePost,
} from '../../types/post';
import ClientBase from './base';

export interface ClientPostMix {
  addPost: (data: IFormAddPost) => Promise<IPost>;
  getPost: (data: IFilterPost) => Promise<IResponsePost>;
}

const ClientPost = <TBase extends Constructor<ClientBase>>(superclass: TBase) =>
  class extends superclass implements ClientPostMix {
    addPost = async (data: IFormAddPost) => {
      return this.doFetch<IPost>(`${this.getBaseRoute()}/post/add`, {
        method: 'post',
        data: data,
      });
    };
    getPost = async (data: IFilterPost) => {
      return this.doFetch<IResponsePost>(`${this.getBaseRoute()}/post/all`, {
        method: 'get',
        params: data,
      });
    };
  };

export default ClientPost;
