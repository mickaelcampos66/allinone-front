import { Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

import NavBar from '../Navbar/NavBar';
import Home from '../Home/Home';
import Details from '../Details/Details';
import List from '../List/List';
import { fetchMovies } from '../../store/thunk/movie';
import Errors from '../Errors/Errors';
import Login from '../Login/Login';

import './App.scss';
import { isLogin } from '../../store/action/AuthentificationAction';

import RegisterForm from '../Register/Register';
import { fetchShows } from '../../store/thunk/shows';
import { fetchMangas } from '../../store/thunk/mangas';
import { fetchAnimes } from '../../store/thunk/animes';
import { fetchBooks } from '../../store/thunk/books';
import { fetchVideogames } from '../../store/thunk/videogames';

import Cgu from '../Footer/Cgu';
import Legal from '../Footer/Legal';
import Footer from '../Footer/Footer';
import Verifications from '../Profils/Verifications';
import Favs from '../Profils/Favs/Favs';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(isLogin());
  }, [dispatch]);

  // dispatch API requests to get home datas
  useEffect(() => {
    dispatch(fetchMovies());
    dispatch(fetchShows());
    dispatch(fetchMangas());
    dispatch(fetchAnimes());
    dispatch(fetchBooks());
    dispatch(fetchVideogames());
  }, [dispatch]);

  return (
    <div className="App  ">
      <NavBar />

      {/* App Routing displaying components depending on routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="details/:slug" element={<Details />} />
        <Route path="register" element={<RegisterForm />} />
        <Route path="login" element={<Login />} />
        <Route path="list/:slug" element={<List />} />
        <Route path="profils" element={<Verifications />} />
        <Route path="profils" element={<Verifications />} />
        <Route path="favoris" element={<Favs />} />
        <Route path="cgu" element={<Cgu />} />
        <Route path="legal" element={<Legal />} />
        <Route path="*" element={<Errors />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
