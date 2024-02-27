import {createAsyncThunk} from '@reduxjs/toolkit';
import {IResponse, IResponseMessage} from '../../types/request_status';
import {
  ILogin,
  IRegister,
  IUpdatePassword,
  IUser,
  IVerifyEmailRegister,
} from '../../types/auth';
import client from '../../clients/https';
import {toastMessage} from '../../utils/toast';

export const login = createAsyncThunk<IResponse<IUser>, ILogin>(
  'auth/login',
  async (payload, {rejectWithValue}) => {
    try {
      console.log('123456');
      const data = await client.login(payload);
      console.log({data});
      return data;
    } catch (error: any) {
      toastMessage.error(error.message);
      return rejectWithValue(error);
    }
  },
);

export const register = createAsyncThunk<IResponse<IUser>, IRegister>(
  'auth/register',
  async (payload, {rejectWithValue}) => {
    try {
      const data = await client.register(payload);
      return data;
    } catch (error: any) {
      toastMessage.error(error.message);
      return rejectWithValue(error);
    }
  },
);

export const updatePassword = createAsyncThunk<
  IResponseMessage,
  IUpdatePassword
>('auth/updatePassword', async (payload, {rejectWithValue}) => {
  try {
    const data = await client.updatePassword(payload);
    return data;
  } catch (error: any) {
    toastMessage.error(error.message);
    return rejectWithValue(error);
  }
});

export const verifyEmailForgotPassword = createAsyncThunk<
  IResponse<string>,
  string
>('auth/verifyEmailForgotPassword', async (payload, {rejectWithValue}) => {
  try {
    const data = await client.verifyEmailForgotPassword(payload);
    return data;
  } catch (error: any) {
    toastMessage.error(error.message);
    return rejectWithValue(error);
  }
});

export const verifyEmailRegister = createAsyncThunk<
  IResponseMessage,
  IVerifyEmailRegister
>('auth/verifyEmailRegister', async (payload, {rejectWithValue}) => {
  try {
    const data = await client.verifyEmailRegister(payload);

    return data;
  } catch (error: any) {
    toastMessage.error(error.message);
    return rejectWithValue(error);
  }
});
