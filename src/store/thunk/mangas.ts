import { createAsyncThunk } from '@reduxjs/toolkit';
import instanceAxios from '../utils/axios';

export const fetchMangas: any = createAsyncThunk('fetchMangas', async () => {
  const result = await instanceAxios.get('/mangas');
  return result.data;
});

export const fetchMangasDetails: any = createAsyncThunk(
  'fetchMangasDetails',
  async (id) => {
    const result = await instanceAxios.get(`/mangas/${id}`);
    return result.data;
  }
);