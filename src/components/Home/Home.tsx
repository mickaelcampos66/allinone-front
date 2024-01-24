import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Carousel from './carrousel/Movie/Carrousel';
import CarouselShow from './carrousel/Show/Carrousel_Show';
import { WindowResize } from '../../store/action/HomeAction';
import { RootState } from '../../store/store';
import './Home.scss';
import CarrouselManga from './carrousel/Mangas/CarrouselManga';
import CarrouselBooks from './carrousel/Book/carrouselBooks';
import CarrouselAnime from './carrousel/Anime/CarrouselAnime';
import CarrouselVideoGame from './carrousel/videoGames/carrouselVideoGame';

const Home = () => {
  // useSelector stores windowSize state in a "size" variable
  const size: number = useSelector((state: RootState) => state.Home.windowSize);
  const listMovie = useSelector((state: RootState) => state.Home.listMovie);
  const listShow = useSelector((state: RootState) => state.Home.listShow);
  const listAnime = useSelector((state: RootState) => state.Home.listAnime);
  const listBooks = useSelector((state: RootState) => state.Home.listBooks);
  const listMangas = useSelector((state: RootState) => state.Home.listMangas);
  const listVideoGames = useSelector(
    (state: RootState) => state.Home.listVideoGames
  );

  // store 10 latest medias
  const TopMovie = listMovie.slice(0, 10);
  const TopShow = listShow.slice(0, 10);
  const TopAnime = listAnime.slice(0, 10);
  const TopBooks = listBooks.slice(0, 10);
  const TopMangas = listMangas.slice(0, 10);
  const TopVideoGames = listVideoGames.slice(0, 10);

  const dispatch = useDispatch();

  //  useEffect fills windowSize state on first render and on window resize
  useEffect(() => {
    dispatch(WindowResize(window.innerWidth));
  }, [dispatch]);

  window.addEventListener('resize', () => {
    dispatch(WindowResize(window.innerWidth));
  });

  // Layout changes depending on window size (+- 1024px)
  if (size >= 1024) {
    return (
      // desktop version
      <div className="Home-desktop">
        <div className="mt-5  pt-5 text-center">
          <p className=" bg-black bg-opacity-50 w-100 p-5 textHome fs-2 m-auto ">
            Découvrez Allinone, où tous vos médias préférés se rejoignent pour
            créer une expérience pop culture unique
          </p>
        </div>
        <h2 className="text-center text-light mt-3">
          Les dernières sorties films
        </h2>
        <div className="w-75     mt-3">
          <div className="d-flex row-cols-12  offset-1 mt-3">
            {TopMovie.map((media: any) => {
              return (
                <div className="col-1 m-4" key={media.id}>
                  <Link to={`details/${media.id}`}>
                    <img
                      className="rounded shadow-lg"
                      src={media.picture}
                      alt={`poster ${media.title}`}
                    />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
        <h2 className="text-light text-center">Les dernières sorties séries</h2>
        <div className="w-75     mt-3">
          <div className="d-flex row-cols-12 offset-1 mt-3">
            {TopShow.map((media: any) => {
              return (
                <div className="col-1 m-4" key={media.id}>
                  <Link to={`details/${media.id}`}>
                    <img
                      className="rounded shadow-lg"
                      src={media.picture}
                      alt={`poster ${media.title}`}
                    />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
        <h2 className="text-light text-center">
          Les dernières sorties animes{' '}
        </h2>
        <div className="w-75     mt-3">
          <div className="d-flex row-cols-12 offset-1 mt-3">
            {TopAnime.map((media: any) => {
              return (
                <div className="col-1 m-4" key={media.id}>
                  <Link to={`details/${media.id}`}>
                    <img
                      className="rounded shadow-lg"
                      src={media.picture}
                      alt={`poster ${media.title}`}
                    />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
        <h2 className="text-light text-center">
          Les dernières sorties mangas{' '}
        </h2>
        <div className="w-75     mt-3">
          <div className="d-flex row-cols-12 offset-1 mt-3">
            {TopMangas.map((media: any) => {
              return (
                <div className="col-1 m-4" key={media.id}>
                  <Link to={`details/${media.id}`}>
                    <img
                      className="rounded shadow-lg"
                      src={media.picture}
                      alt={`poster ${media.title}`}
                    />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
        <h2 className="text-light text-center">
          Les dernières sorties jeux videos{' '}
        </h2>
        <div className="w-75     mt-3">
          <div className="d-flex row-cols-12 offset-1 mt-3">
            {TopVideoGames.map((media: any) => {
              return (
                <div className="col-1 m-4" key={media.id}>
                  <Link to={`details/${media.id}`}>
                    <img
                      className="rounded shadow-lg"
                      src={media.picture}
                      alt={`poster ${media.title}`}
                    />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
        <h2 className="text-light text-center">
          Les dernières sorties livres{' '}
        </h2>
        <div className="w-75     mt-3">
          <div className="d-flex row-cols-12 offset-1 mt-3">
            {TopBooks.map((media: any) => {
              return (
                <div className="col-1 m-4" key={media.id}>
                  <Link to={`details/${media.id}`}>
                    <img
                      className="rounded shadow-lg"
                      src={media.picture}
                      alt={`poster ${media.title}`}
                    />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
  return (
    // mobile version
    <div className="Home-mobile ">
      <div className=" w-75 m-auto mt-5 text-center pt-5">
        <p className="bg-dark fs-sm-5 textHome p-2 ">
          Découvrez Allinone, où tous vos médias préférés se rejoignent pour
          créer une expérience pop culture unique
        </p>
      </div>

      <div className="movie  mt-3">
        <h2 className="fs-5 ms-2 text-center text-light">
          Les dernières sorties films
        </h2>
        <Carousel />
      </div>
      <div className="show  mt-5">
        <h2 className="fs-5 ms-2 text-center text-light">
          Les dernières sorties séries
        </h2>
        <CarouselShow />
      </div>
      <div className="show  mt-5">
        <h2 className="fs-5 ms-2 text-center text-light">
          Les dernières sorties animes
        </h2>
        <CarrouselAnime />
      </div>
      <div className="show  mt-5">
        <h2 className="fs-5 ms-2 text-center text-light">
          Les dernières sorties mangas
        </h2>
        <CarrouselManga />
      </div>
      <div className="show  mt-5">
        <h2 className="fs-5 ms-2 text-center text-light">
          Les dernières sorties jeux video
        </h2>
        <CarrouselVideoGame />
      </div>
      <div className="show  mt-5">
        <h2 className="fs-5 ms-2 text-center text-light">
          Les dernières sorties livres
        </h2>
        <CarrouselBooks />
      </div>
    </div>
  );
};

export default Home;
