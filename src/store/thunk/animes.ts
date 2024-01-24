import { createAsyncThunk } from '@reduxjs/toolkit';
import instanceAxios from '../utils/axios';
// fetch data from API
export const fetchAnimes: any = createAsyncThunk('fetchAnimes', async () => {
  // GET request on api route /animes
  const result = await instanceAxios.get('/animes');
  return result.data;
});

export const fetchAnimesDetails: any = createAsyncThunk(
  'fetchAnimesDetails',
  async (id) => {
    // GET request on api /animes/id to fetch a single anime
    const result = await instanceAxios.get(`/animes/${id}`);
    return result.data;
  }
);
