import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Page from './Page/Page';
import './Details.scss';
import { fetchMoviesDetails } from '../../store/thunk/movie';
import { RootState } from '../../store/store';

const Details = () => {
  const { slug } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    // @ts-ignore
    dispatch(fetchMoviesDetails(slug));
  }, [dispatch, slug]);

  const loading = useSelector((state: RootState) => state.Details.isLoading);
  if (loading === false) {
    return <h2 className="text-light text-center">En chargement</h2>;
  }
  return (
    <main className="Details">
      <Page />
    </main>
  );
};

export default Details;
