import {IResponse} from './request_status';

export interface IPlace {
  _id: string;
  name: string;
  location: string;
  address: string;
  startingPrice: number;
  LastPrice: number;
  purpose: string;
  type: string;
  rating: number;
  description: string;
  image: string[];
  favourite: string[];
  openTime: number;
  closeTime: number;
  statisticCmt: {_id: string; rateComments: boolean}[];
}

export interface IFilterPlace {
  limit: number;
  location: string;
  pageNumber: number;
  placeName: string;
  purpose: string;
  type: string;
  variability: string;
}
export interface IFavoritePlace {
  _id: string;
  placeId: IPlace;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export interface IResponsePlace
  extends IResponse<{total: number; totalPage: number; data: IPlace[]}> {}
