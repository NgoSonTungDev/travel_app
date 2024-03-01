import {createAsyncThunk} from '@reduxjs/toolkit';
import client from '../../clients/https';
import {
  IFilterPost,
  IFormAddPost,
  IPost,
  IResponsePost,
} from '../../types/post';
import {toastMessage} from '../../utils/toast';

export const addPost = createAsyncThunk<IPost, IFormAddPost>(
  'post/addPost',
  async (payload, {rejectWithValue}) => {
    try {
      const data = await client.addPost(payload);
      return data;
    } catch (error: any) {
      toastMessage.error(error?.message || 'Lỗi hệ thống !');
      return rejectWithValue(error);
    }
  },
);

export const getPost = createAsyncThunk<IResponsePost, IFilterPost>(
  'post/getPost',
  async (payload, {rejectWithValue}) => {
    try {
      const data = await client.getPost(payload);
      return data;
    } catch (error: any) {
      toastMessage.error(error?.message || 'Lỗi hệ thống !');
      return rejectWithValue(error);
    }
  },
);
