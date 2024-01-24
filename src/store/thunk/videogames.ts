import { createAsyncThunk } from '@reduxjs/toolkit';

import instanceAxios from '../utils/axios';

export const fetchVideogames: any = createAsyncThunk(
  'fetchVideogames',
  async () => {
    const result = await instanceAxios.get('/videogames');
    return result.data;
  }
);

export const fetchVideogamesDetails: any = createAsyncThunk(
  'fetchVideogamesDetails',
  async (id) => {
    const result = await instanceAxios.get(`/videogames/${id}`);
    return result.data;
  }
);
