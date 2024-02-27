import {createAsyncThunk} from '@reduxjs/toolkit';
import client from '../../clients/https';

export const login = createAsyncThunk<any, any>(
  'auth/login',
  async (payload, {rejectWithValue}) => {
    try {
      const data = await client.login(payload);
      return data;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  },
);
