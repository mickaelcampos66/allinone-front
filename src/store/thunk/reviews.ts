import { createAsyncThunk } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import { isNotNullish } from '@reduxjs/toolkit/dist/query/utils/isNotNullish';
import { RootState } from '../store';
import instanceAxios from '../utils/axios';

export const ReviewsForm: any = createAsyncThunk(
  'POST_REVIEW',

  async (id: any, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;
    const details = state.Details;
    const url = 'https://allinone.yannicksendrey.dev/api/reviews/add';

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
        alert(
          'Votre critique a bien été enregistrée et est en attente de validation !'
        );
      } else {
        alert('Vous avez déjà laissé une critique sur cette oeuvre');
      }

      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const deleteReview: any = createAsyncThunk(
  'DELETE_REVIEW',

  async (id: any, thunkAPI) => {
    const url = 'https://allinone.yannicksendrey.dev/api/reviews/add';

    const userId = Number(localStorage.getItem('userId'));

    try {
      const result = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          mediaId: id,
        }),
      });

      const data = await result.json();

      if (result.ok) {
        alert('Votre critique a bien été supprimée !');
      } else {
        alert(
          'Une erreur est survenue lors de la suppression de votre critique'
        );
      }

      return data;
    } catch (error) {
      console.log(error);
    }
  }
);
