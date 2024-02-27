import {PayloadAction, createSlice} from '@reduxjs/toolkit';

import {login} from './auth_action';
import client from '../../clients/https';
import {IUser} from '../../types/auth';
import {IResponse} from '../../types/request_status';

interface IAuthState {
  me: IUser | null;
}

const initialState: IAuthState = {
  me: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(
      login.fulfilled,
      (state, action: PayloadAction<IResponse<IUser>>) => {
        state.me = action.payload.data;
      },
    );
  },
});

const {actions, reducer} = authSlice;
// export const {logoutLocal} = actions;
export default reducer;
