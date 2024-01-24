import { createAsyncThunk } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import { RootState } from '../store';
import instanceAxios from '../utils/axios';

export const AddFavs: any = createAsyncThunk(
  'ADD_FAVS',

  async (id: any, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;
    const details = state.Details;
    const url = 'https://allinone.yannicksendrey.dev/api/users/favorites/add';
    const userId = Number(localStorage.getItem('userId'));

    try {
      const result = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: details.ReviewFrom.title,
          content: details.ReviewFrom.content,
          rating: details.ReviewFrom.rating,
          userId,
          mediaId: id,
        }),
      });

      const data = await result.json();

      if (result.ok) {
        alert('Le Media a bien ete ajouté a votre liste de favoris  !');
      } else {
        alert('Media deja dans les favoris ');
      }

      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const fetchFavoris: any = createAsyncThunk('FETCH_FAVORIS', async () => {
  const id = Number(localStorage.getItem('userId'));
  const result = await instanceAxios.get(`users/favorites/${id}`);

  return result.data.favorites;
});
