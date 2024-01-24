import { createReducer } from '@reduxjs/toolkit';
import { fetchMovies } from './thunk/movie';
import { fetchShows } from './thunk/shows';
import { fetchAnimes } from './thunk/animes';
import { fetchBooks } from './thunk/books';
import { fetchVideogames } from './thunk/videogames';
import { fetchMangas } from './thunk/mangas';

const InitialState = {
  listMovie: [],
  listShows: [],
  listAnimes: [],
  listBooks: [],
  listVideogames: [],
  listMangas: [],
};

const ListReducer = createReducer(InitialState, (builder) => {
  builder

    .addCase(fetchMovies.fulfilled, (state, action) => {
      state.listMovie = action.payload;
    })
    .addCase(fetchShows.fulfilled, (state, action) => {
      state.listShows = action.payload;
    })
    .addCase(fetchAnimes.fulfilled, (state, action) => {
      state.listAnimes = action.payload;
    })
    .addCase(fetchBooks.fulfilled, (state, action) => {
      state.listBooks = action.payload;
    })
    .addCase(fetchVideogames.fulfilled, (state, action) => {
      state.listVideogames = action.payload;
    })
    .addCase(fetchMangas.fulfilled, (state, action) => {
      state.listMangas = action.payload;
    });
});

export default ListReducer;
