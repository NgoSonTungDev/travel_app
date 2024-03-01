import {IResponse} from './request_status';

export interface IPost {
  _id: string;
  userId: {
    _id: string;
    userName: string;
    avt: string;
  };
  content: string;
  image: string;
  public: boolean;
  rating: number;
  like: string[];
  time: number;
  placeId: {
    _id: string;
    name: string;
  };
}

export interface IFilterPost {
  active: boolean;
  limit: number;
  pageNumber: number;
  placeId: string;
}

export interface IFormAddPost {
  userId: string;
  content: string;
  image: string;
  public: boolean;
  rating: number;
  time: number;
  placeId: string;
}

export interface IResponsePost
  extends IResponse<{total: number; totalPage: number; data: IPost[]}> {}
