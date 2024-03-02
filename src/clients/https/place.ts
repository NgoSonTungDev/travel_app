import {
  IFavoritePlace,
  IFilterPlace,
  IPlace,
  IResponsePlace,
} from '../../types/place';
import {IResponse} from '../../types/request_status';
import ClientBase from './base';

export interface ClientPlaceMix {
  getPlaces: (data: IFilterPlace) => Promise<IResponsePlace>;
  getListFavorite: (userId: string) => Promise<IResponse<IFavoritePlace[]>>;
}

const ClientPlace = <TBase extends Constructor<ClientBase>>(
  superclass: TBase,
) =>
  class extends superclass implements ClientPlaceMix {
    getPlaces = async (data: IFilterPlace) => {
      return this.doFetch<IResponsePlace>(`${this.getBaseRoute()}/place/all`, {
        method: 'get',
        params: data,
      });
    };
    getListFavorite = async (userId: string) => {
      return this.doFetch<IResponse<IFavoritePlace[]>>(
        `${this.getBaseRoute()}/favourite/get-by-id/${userId}`,
        {
          method: 'get',
        },
      );
    };
  };

export default ClientPlace;
