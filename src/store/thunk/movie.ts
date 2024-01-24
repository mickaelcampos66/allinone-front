import { createAsyncThunk } from '@reduxjs/toolkit';

import instanceAxios from '../utils/axios';

export const fetchMovies: any = createAsyncThunk('fetchMovies', async () => {
  const result = await instanceAxios.get('/movies');
  return result.data;
});

export const fetchMoviesDetails: any = createAsyncThunk(
  'fetchMoviesDetails',
  async (id) => {
    const result = await instanceAxios.get(`/movies/${id}`);

    return result.data;
  }
);
