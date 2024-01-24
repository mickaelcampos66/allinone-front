import { createReducer } from '@reduxjs/toolkit';
import { fetchMovies, fetchMoviesDetails } from './thunk/movie';
import { inputContent, inputRating, inputTitle } from './action/reviewsAction';

// typing state
interface DetailsReducer {
  oeuvre: any;

  isLoading: boolean;
  reviews: [];
  ReviewFrom: {
    title: string;
    content: string;
    rating: number;
  };
}
// State init
const InitialState: DetailsReducer = {
  oeuvre: [],
  isLoading: false,
  reviews: [],
  ReviewFrom: {
    title: '',
    content: '',
    rating: 0,
  },
};
// eslint-disable-next-line @typescript-eslint/no-redeclare
const DetailReducer = createReducer(InitialState, (builder) => {
  builder

    // if fetch ok, store data in state
    .addCase(fetchMoviesDetails.fulfilled, (state, action) => {
      state.oeuvre = action.payload;
      state.reviews = action.payload.reviews;
      state.isLoading = true;
    })
    .addCase(fetchMovies.rejected, (state, action) => {
      state.isLoading = false;
    })

    // ******* forms handling  *********
    // action.payload = user input value
    .addCase(inputRating, (state, action) => {
      state.ReviewFrom.rating = action.payload;
    })
    .addCase(inputTitle, (state, action) => {
      state.ReviewFrom.title = action.payload;
    })
    .addCase(inputContent, (state, action) => {
      state.ReviewFrom.content = action.payload;
    });
  // ***************************************
});

export default DetailReducer;
