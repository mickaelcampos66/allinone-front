import { createReducer } from '@reduxjs/toolkit';
import { WindowResize } from './action/HomeAction';
import { fetchMovies } from './thunk/movie';
import { fetchShows } from './thunk/shows';
import { fetchBooks } from './thunk/books';
import { fetchAnimes } from './thunk/animes';
import { fetchMangas } from './thunk/mangas';
import { fetchVideogames } from './thunk/videogames';

interface HomeState {
  windowSize: number;
  listMovie: [];
  listShow: [];
  listAnime: [];
  listBooks: [];
  listMangas: [];
  listVideoGames: [];
}

const initialState: HomeState = {
  windowSize: 1024,
  listMovie: [],
  listShow: [],
  listAnime: [],
  listBooks: [],
  listMangas: [],
  listVideoGames: [],
};
const HomeReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(WindowResize, (state, action) => {
      state.windowSize = action.payload;
    })
    // ************* Sort release date data for home page *****************
    .addCase(fetchMovies.fulfilled, (state, action) => {
      state.listMovie = action.payload.sort((a: any, b: any) => {
        if (a.release_date > b.release_date) return -1;
        if (a.release_date < b.release_date) return 1;
        return 0;
      });
    })
    .addCase(fetchShows.fulfilled, (state, action) => {
      state.listShow = action.payload.sort((a: any, b: any) => {
        if (a.release_date > b.release_date) return -1;
        if (a.release_date < b.release_date) return 1;
        return 0;
      });
    })
    .addCase(fetchBooks.fulfilled, (state, action) => {
      state.listBooks = action.payload.sort((a: any, b: any) => {
        if (a.release_date > b.release_date) return -1;
        if (a.release_date < b.release_date) return 1;
        return 0;
      });
    })

    .addCase(fetchAnimes.fulfilled, (state, action) => {
      state.listAnime = action.payload.sort((a: any, b: any) => {
        if (a.release_date > b.release_date) return -1;
        if (a.release_date < b.release_date) return 1;
        return 0;
      });
    })

    .addCase(fetchMangas.fulfilled, (state, action) => {
      state.listMangas = action.payload.sort((a: any, b: any) => {
        if (a.release_date > b.release_date) return -1;
        if (a.release_date < b.release_date) return 1;
        return 0;
      });
    })
    .addCase(fetchVideogames.fulfilled, (state, action) => {
      state.listVideoGames = action.payload.sort((a: any, b: any) => {
        if (a.release_date > b.release_date) return -1;
        if (a.release_date < b.release_date) return 1;
        return 0;
      });
    });
  //* **************************************************************************
});

export default HomeReducer;
