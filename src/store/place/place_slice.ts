import {PayloadAction, createSlice} from '@reduxjs/toolkit';

import {IFilterPlace, IPlace, IResponsePlace} from '../../types/place';
import {getPlaces} from './place_action';
import {initFilterPlace} from '../../constants/common';

interface IPlaceState {
  data: {
    total: number;
    totalPage: number;
    data: IPlace[];
  };
  filter: IFilterPlace;
}

const initialState: IPlaceState = {
  data: {
    data: [],
    total: 0,
    totalPage: 0,
  },
  filter: initFilterPlace,
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
  },
  extraReducers: builder => {
    builder.addCase(
      getPlaces.fulfilled,
      (state, action: PayloadAction<IResponsePlace>) => {
        state.data = action.payload.data;
      },
    );
  },
});

const {actions, reducer} = placeSlice;
export const {changeFilter, refreshData} = actions;
export default reducer;
