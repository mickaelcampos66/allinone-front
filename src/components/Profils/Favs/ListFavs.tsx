import './ListeFavs.scss';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchFavoris } from '../../../store/thunk/Favs';
import { RootState } from '../../../store/store';

const ListFavs = () => {
  const dispatch = useDispatch();
  const favs = useSelector((state: RootState) => state.User.Favoris);

  useEffect(() => {
    dispatch(fetchFavoris());
  }, [dispatch]);
  return (
    <div id="List">
      <h2 className="text-center text-light">Liste des favoris </h2>
      <div className="d-flex flex-wrap m-auto card-list">
        {favs.map((media: any) => {
          return (
            <div key={media.id} className="card bg-dark text-light">
              <img
                src={media.picture}
                className="card-img-top"
                alt="img-movies"
              />
              <div className="card-header">
                <h5 className="card-title">{media.title}</h5>
              </div>
              <div className="card-body">
                <div className="summary">
                  <p className="card-text">{media.summary}</p>
                </div>
                <div>
                  {media.genres.map((genre: any) => {
                    return (
                      <span
                        key={genre.id}
                        className="badge badge-secondary ms-1 bg-success"
                      >
                        {genre.name}
                      </span>
                    );
                  })}
                </div>
              </div>
              <div className="card-footer d-flex">
                <Link to={`/details/${media.id}`} className="btn btn-primary">
                  Voir details
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default ListFavs;
