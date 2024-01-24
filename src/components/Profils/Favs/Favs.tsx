import './Favs.scss';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import ListFavs from './ListFavs';

const Favs = () => {
  const isLogin = useSelector((state: RootState) => state.User.isLoggin);
  useEffect(() => {}, []);

  if (isLogin) {
    return (
      <div className="" id="Favs">
        <ListFavs />
      </div>
    );
  }
  return (
    <div className="" id="Favs">
      <h1 className=" text-light text-center">404 Not Found</h1>
    </div>
  );
};

export default Favs;
