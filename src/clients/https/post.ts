import {
  IFilterPost,
  IFormAddPost,
  IPost,
  IResponsePost,
} from '../../types/post';
import {IResponse} from '../../types/request_status';
import ClientBase from './base';

export interface ClientPostMix {
  addPost: (data: IFormAddPost) => Promise<IPost>;
  getPost: (data: IFilterPost) => Promise<IResponsePost>;
  getPostByUserId: (userId: string) => Promise<IResponse<IPost[]>>;
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
    getPostByUserId = async (userId: string) => {
      return this.doFetch<IResponse<IPost[]>>(
        `${this.getBaseRoute()}/post/get-id-user/${userId}`,
        {
          method: 'get',
        },
      );
    };
  };

export default ClientPost;
