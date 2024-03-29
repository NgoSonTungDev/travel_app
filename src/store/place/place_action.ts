import {createAsyncThunk} from '@reduxjs/toolkit';
import client from '../../clients/https';
import {
  IFavoritePlace,
  IFilterPlace,
  IPurposeType,
  IResponsePlace,
} from '../../types/place';
import {IResponse, IResponseMessage} from '../../types/request_status';
import {toastMessage} from '../../utils/toast';

export const getTypes = createAsyncThunk<IResponse<IPurposeType[]>, void>(
  'place/getTypes',
  async (_, {rejectWithValue}) => {
    try {
      const data = await client.getTypes();
      return data;
    } catch (error: any) {
      toastMessage.error(error?.message || 'Lỗi hệ thống !');
      return rejectWithValue(error);
    }
  },
);

export const getPurposes = createAsyncThunk<IResponse<IPurposeType[]>, void>(
  'place/getPurposes',
  async (_, {rejectWithValue}) => {
    try {
      const data = await client.getPurposes();
      return data;
    } catch (error: any) {
      toastMessage.error(error?.message || 'Lỗi hệ thống !');
      return rejectWithValue(error);
    }
  },
);

export const getPlaces = createAsyncThunk<IResponsePlace, IFilterPlace>(
  'place/getPlaces',
  async (payload, {rejectWithValue}) => {
    try {
      const data = await client.getPlaces(payload);
      return data;
    } catch (error: any) {
      toastMessage.error(error?.message || 'Lỗi hệ thống !');
      return rejectWithValue(error);
    }
  },
);

export const getListFavorite = createAsyncThunk<
  IResponse<IFavoritePlace[]>,
  string
>('place/getListFavorite', async (payload, {rejectWithValue}) => {
  try {
    const data = await client.getListFavorite(payload);
    return data;
  } catch (error: any) {
    toastMessage.error(error?.message || 'Lỗi hệ thống !');
    return rejectWithValue(error);
  }
});

export const deleteFavorite = createAsyncThunk<IResponseMessage, string>(
  'place/deleteFavorite',
  async (payload, {rejectWithValue}) => {
    try {
      const data = await client.deleteFavorite(payload);
      return data;
    } catch (error: any) {
      toastMessage.error(error?.message || 'Lỗi hệ thống !');
      return rejectWithValue(error);
    }
  },
);
