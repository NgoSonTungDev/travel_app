import {PayloadAction, createSlice} from '@reduxjs/toolkit';

import {initFilterPlace} from '../../constants/common';
import {
  IFilterPlace,
  IPlace,
  IPurposeType,
  IResponsePlace,
} from '../../types/place';
import {IResponse} from '../../types/request_status';
import {getPlaces, getPurposes, getTypes} from './place_action';

interface IPlaceState {
  data: {
    total: number;
    totalPage: number;
    data: IPlace[];
  };
  filter: IFilterPlace;
  purposes: IPurposeType[];
  types: IPurposeType[];
}

const initialState: IPlaceState = {
  data: {
    data: [],
    total: 0,
    totalPage: 0,
  },
  filter: initFilterPlace,
  purposes: [],
  types: [],
};

const placeSlice = createSlice({
  name: 'place',
  initialState,
  reducers: {
    changeFilter: (state, action: PayloadAction<IFilterPlace>) => {
      state.filter = action.payload;
    },
    refreshData: state => {
      state.data = initialState.data;
    },
    refreshFilter: state => {
      state.filter = initialState.filter;
    },
  },
  extraReducers: builder => {
    builder.addCase(
      getPlaces.fulfilled,
      (state, action: PayloadAction<IResponsePlace>) => {
        state.data = action.payload.data;
      },
    );
    builder.addCase(
      getTypes.fulfilled,
      (state, action: PayloadAction<IResponse<IPurposeType[]>>) => {
        state.types = action.payload.data;
      },
    );
    builder.addCase(
      getPurposes.fulfilled,
      (state, action: PayloadAction<IResponse<IPurposeType[]>>) => {
        state.purposes = action.payload.data;
      },
    );
  },
});

const {actions, reducer} = placeSlice;
export const {changeFilter, refreshData, refreshFilter} = actions;
export default reducer;
