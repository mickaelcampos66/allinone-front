import { createAsyncThunk } from '@reduxjs/toolkit';

import instanceAxios from '../utils/axios';

export const fetchShows: any = createAsyncThunk('fetchShows', async () => {
  const result = await instanceAxios.get('/shows');
  return result.data;
});

export const fetchMoviesDetails: any = createAsyncThunk(
  'fetchShowsDetails',
  async (id) => {
    const result = await instanceAxios.get(`/shows/${id}`);
    return result.data;
  }
);
