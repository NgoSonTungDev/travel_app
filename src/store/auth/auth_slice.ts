import {PayloadAction, createSlice} from '@reduxjs/toolkit';

import {login} from './auth_action';
import {IAuthResponse} from '../../types/auth';
import client from '../../clients/https';

interface IAuthState {
  token: string;
}

const initialState: IAuthState = {
  token: '',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logoutLocal: state => {
      state.token = '';
    },
  },
  extraReducers: builder => {
    builder.addCase(
      login.fulfilled,
      (state, action: PayloadAction<IAuthResponse>) => {
        state.token = action.payload.token;
        client.setToken(action.payload.token);
      },
    );
  },
});

const {actions, reducer} = authSlice;
export const {logoutLocal} = actions;
export default reducer;
