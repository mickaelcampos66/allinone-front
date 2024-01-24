import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Type from './Media/Type';
import { fetchMovies } from '../../store/thunk/movie';
import { RootState } from '../../store/store';
import { fetchShows } from '../../store/thunk/shows';
import { fetchAnimes } from '../../store/thunk/animes';
import { fetchBooks } from '../../store/thunk/books';
import './List.scss';
import { fetchVideogames } from '../../store/thunk/videogames';
import { fetchMangas } from '../../store/thunk/mangas';

const List = () => {
  // useParams returns an object of key/value pairs of URL parameters. Use it to access slug value and display the right list.
  const { slug } = useParams();
  const dispatch = useDispatch();
  const Movie = useSelector((state: RootState) => state.List.listMovie);
  const Shows = useSelector((state: RootState) => state.List.listShows);
  const Animes = useSelector((state: RootState) => state.List.listAnimes);
  const Books = useSelector((state: RootState) => state.List.listBooks);
  const Videogames = useSelector(
    (state: RootState) => state.List.listVideogames
  );
  const Mangas = useSelector((state: RootState) => state.List.listMangas);
  const displayMenu = useSelector(
    (state: RootState) => state.Navbar.menuHidden
  );
  useEffect(() => {
    dispatch(fetchMovies());
    dispatch(fetchShows());
    dispatch(fetchAnimes());
    dispatch(fetchBooks());
    dispatch(fetchVideogames());
    dispatch(fetchMangas());
  }, [dispatch, slug]);

  // Display the right list depending on slug value
  if (slug === 'films') {
    return (
      <div className="List">
        <h1 className="mt-5 pt-5 text-light text-center">
          {' '}
          Bienvenue sur les films !
        </h1>
        {/* ternary adding a class depending on if burger menu is activated or not */}
        <div className={displayMenu ? 'list-oeuvre ' : 'decaler'}>
          {/* Iterate on array and display a Type component with its value passed as props  */}
          {Movie.map((film: any) => (
            <Type
              key={film.id}
              title={film.title}
              picture={film.picture}
              summary={film.summary}
              id={film.id}
            />
          ))}
        </div>
      </div>
    );
  }
  if (slug === 'series') {
    return (
      <div className="List">
        <h1 className="mt-5 pt-5 text-light text-center">
          {' '}
          Bienvenue sur les séries !
        </h1>
        <div className={displayMenu ? 'list-oeuvre ' : 'decaler'}>
          {Shows.map((serie: any) => (
            <Type
              key={serie.id}
              title={serie.title}
              picture={serie.picture}
              summary={serie.summary}
              id={serie.id}
            />
          ))}
        </div>
      </div>
    );
  }
  if (slug === 'animes') {
    return (
      <div className="List">
        <h1 className="mt-5 pt-5 text-light text-center">
          {' '}
          Bienvenue sur les animes !
        </h1>
        <div className={displayMenu ? 'list-oeuvre ' : 'decaler'}>
          {Animes.map((animes: any) => (
            <Type
              key={animes.id}
              title={animes.title}
              picture={animes.picture}
              summary={animes.summary}
              id={animes.id}
            />
          ))}
        </div>
      </div>
    );
  }
  if (slug === 'livres') {
    return (
      <div className="List">
        <h1 className="mt-5 pt-5 text-light text-center">
          {' '}
          Bienvenue sur les livres !
        </h1>
        <div className={displayMenu ? 'list-oeuvre ' : 'decaler'}>
          {Books.map((livre: any) => (
            <Type
              key={livre.id}
              title={livre.title}
              picture={livre.picture}
              summary={livre.summary}
              id={livre.id}
            />
          ))}
        </div>
      </div>
    );
  }
  if (slug === 'jeux-video') {
    return (
      <div className="List">
        <h1 className="mt-5 pt-5 text-light text-center">
          {' '}
          Bienvenue sur les jeux-video !
        </h1>
        <div className={displayMenu ? 'list-oeuvre ' : 'decaler'}>
          {Videogames.map((jeuxVideos: any) => (
            <Type
              key={jeuxVideos.id}
              title={jeuxVideos.title}
              picture={jeuxVideos.picture}
              summary={jeuxVideos.summary}
              id={jeuxVideos.id}
            />
          ))}
        </div>
      </div>
    );
  }

  if (slug === 'mangas') {
    return (
      <div className="List">
        <h1 className="mt-5 pt-5 text-light text-center">
          {' '}
          Bienvenue sur les mangas !
        </h1>
        <div className={displayMenu ? 'list-oeuvre ' : 'decaler'}>
          {Mangas.map((Manga: any) => (
            <Type
              key={Manga.id}
              title={Manga.title}
              picture={Manga.picture}
              summary={Manga.summary}
              id={Manga.id}
            />
          ))}
        </div>
      </div>
    );
  }

  return <h1>Page introuvable</h1>;
};

export default List;
