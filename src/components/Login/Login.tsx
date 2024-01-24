import './Login.scss';
import { useDispatch, useSelector } from 'react-redux';
import { ChangeEvent, FormEvent, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { RootState } from '../../store/store';
import {
  EmailForm,
  PasswordForm,
} from '../../store/action/AuthentificationAction';
import checkUser from '../../store/thunk/authentification';
import { WindowResize } from '../../store/action/HomeAction';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const valueEmail = useSelector((state: RootState) => state.User.email);
  const valuePassword = useSelector((state: RootState) => state.User.password);

  const isLoggin = useSelector((state: RootState) => state.User.isLoggin);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(checkUser());
  };

  useEffect(() => {
    dispatch(WindowResize(window.innerWidth));

    // redirection based on state in useEffect to handle asynchrone state update

    if (isLoggin) {
      navigate('/');
    }
  }, [dispatch, isLoggin, navigate]);

  const size: number = useSelector((state: RootState) => state.Home.windowSize);
  window.addEventListener('resize', () => {
    dispatch(WindowResize(window.innerWidth));
  });
  if (size >= 1024) {
    return (
      <div className="Login-register-desktop ">
        <form className="Form mt-5 pt-5 " onSubmit={handleSubmit}>
          <label htmlFor="email">Votre email</label>
          <input
            type="email"
            id="email"
            className="text-dark ps-3 pe-3"
            value={valueEmail}
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
              dispatch(EmailForm(event.target.value));
            }}
          />
          <label htmlFor="password">Votre mot de passe</label>
          <input
            type="password"
            id="password"
            className="text-dark ps-3 pe-3"
            value={valuePassword}
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
              dispatch(PasswordForm(event.target.value));
            }}
          />

          <div className="w-25 m-auto text-center mt-3">
            <button type="submit" className="btn btn-light w-100">
              Envoyer
            </button>
          </div>
          <p className="text-light text-center mt-5">
            Si vous n'êtes pas encore inscrit cliquez{' '}
            <Link to="/register">ici</Link>{' '}
          </p>
        </form>
      </div>
    );
  }

  return (
    <div className="Login-register-mobile text-center ">
      <form className="Form " onSubmit={handleSubmit}>
        <div className="champs">
          <input
            type="email"
            className="text-dark w-75 mx-5 ps-3 pe-3"
            placeholder="Votre email"
            value={valueEmail}
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
              dispatch(EmailForm(event.target.value));
            }}
          />
          <input
            type="password"
            className="text-dark w-75 mx-5 ps-3 pe-3"
            placeholder="Votre mot de passe"
            value={valuePassword}
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
              dispatch(PasswordForm(event.target.value));
            }}
          />
        </div>
        <div className="w-50 m-auto  mt-5 text-center ">
          <button type="submit" className="btn btn-light w-100">
            Envoyer
          </button>
          <p className="text-light text-center mt-5">
            Si vous n'êtes pas encore inscrit cliquez{' '}
            <Link to="/register">ici</Link>{' '}
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
