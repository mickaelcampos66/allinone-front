import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import Profils from './Profils';

const Verifications = () => {
  const isLogin = useSelector((state: RootState) => state.User.isLoggin);
  // Render Profile page depending on isLogin state
  if (isLogin === true) {
    return <Profils />;
  }
  // Else render an error page
  return (
    <div className="mt-5 pt-5">
      <h2 className="text-light text-center"> Page non autorisée </h2>
    </div>
  );
};

export default Verifications;
