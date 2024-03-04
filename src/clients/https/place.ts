import {
  IFavoritePlace,
  IFilterPlace,
  IPlace,
  IResponsePlace,
} from '../../types/place';
import {IResponse, IResponseMessage} from '../../types/request_status';
import ClientBase from './base';

export interface ClientPlaceMix {
  getPlaces: (data: IFilterPlace) => Promise<IResponsePlace>;
  getListFavorite: (userId: string) => Promise<IResponse<IFavoritePlace[]>>;
  deleteFavorite: (favouriteId: string) => Promise<IResponseMessage>;
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
    deleteFavorite = async (favouriteId: string) => {
      return this.doFetch<IResponse<IFavoritePlace[]>>(
        `${this.getBaseRoute()}/favourite/delete/${favouriteId}`,
        {
          method: 'delete',
        },
      );
    };
  };

export default ClientPlace;
