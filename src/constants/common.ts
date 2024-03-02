import {IFilterPlace} from '../types/place';
import {IFilterPost} from '../types/post';

export const initFilterPost: IFilterPost = {
  active: true,
  limit: 20,
  pageNumber: 1,
  placeId: '',
};

export const initFilterPlace: IFilterPlace = {
  limit: 20,
  location: '',
  pageNumber: 1,
  placeName: '',
  purpose: '',
  type: '',
  variability: '',
};
