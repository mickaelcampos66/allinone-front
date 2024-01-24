import { createAsyncThunk } from '@reduxjs/toolkit';

import instanceAxios from '../utils/axios';

export const fetchBooks: any = createAsyncThunk('fetchBooks', async () => {
  const result = await instanceAxios.get('/books');
  return result.data;

});

export const fetchBooksDetails: any = createAsyncThunk(
  'fetchBooksDetails',
  async (id) => {
    const result = await instanceAxios.get(`/books/${id}`);
    return result.data;
  }
);