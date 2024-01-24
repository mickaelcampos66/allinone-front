import { ChangeEvent, FormEvent, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  RegisterEmail,
  RegisterPassword,
  RegisterUsername,
} from '../../store/action/AuthentificationAction';
import RegisterUser from '../../store/thunk/Register';
import { WindowResize } from '../../store/action/HomeAction';
import { RootState } from '../../store/store';
import './Register.scss';
import { NavLink, useNavigate } from 'react-router-dom';

const RegisterForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const emailRegister = useSelector(
    (state: RootState) => state.User.Register.registerEmail
  );
  const passwordRegister = useSelector(
    (state: RootState) => state.User.Register.registerPassword
  );
  const username = useSelector(
    (state: RootState) => state.User.Register.username
  );

  const handleSubmitRegister = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await dispatch(RegisterUser()).unwrap();
      navigate('/login');
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    dispatch(WindowResize(window.innerWidth));
  }, [dispatch]);

  window.addEventListener('resize', () => {
    dispatch(WindowResize(window.innerWidth));
  });

  const size: number = useSelector((state: RootState) => state.Home.windowSize);
  if (size >= 1024) {
    return (
      <form onSubmit={handleSubmitRegister} className="mt-5 form-desktop pt-5">
        <label htmlFor="email">Votre Email:</label>
        <input
          type="email"
          id="email"
          className="text-dark ps-3 pe-3"
          required
          value={emailRegister}
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            dispatch(RegisterEmail(event.target.value));
          }}
        />
        <label htmlFor="password">Votre password</label>
        <input
          id="password"
          type="password"
          className="text-dark ps-3 pe-3"
          required
          minLength={6}
          value={passwordRegister}
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            dispatch(RegisterPassword(event.target.value));
          }}
        />
        <label htmlFor="pseudo">Votre pseudo</label>
        <input
          id="pseudo"
          value={username}
          className="text-dark ps-3 pe-3"
          required
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            dispatch(RegisterUsername(event.target.value));
          }}
        />
        <div className="d-flex justify-content-center align-items-center mt-4 mb-3  m-auto">
          <input
            className="form-check-input me-1 m-auto p-2"
            type="checkbox"
            id="rgpd"
            required
          />
          <label className="m-auto ms-4 form-check-label" htmlFor="rgpd">
            J'accepte les conditions d'utilisation &nbsp;
            <NavLink to="/cgu" target="_blank">
              (disponibles ici)
            </NavLink>
          </label>
        </div>
        <button type="submit" className="btn btn-primary mt-2 w-50">
          Creez votre compte
        </button>
      </form>
    );
  }
  return (
    <form onSubmit={handleSubmitRegister} className=" form-mobile pt-5">
      <label htmlFor="email">Votre Email:</label>
      <input
        id="email"
        required
        className="text-dark ps-3 pe-3"
        value={emailRegister}
        onChange={(event: ChangeEvent<HTMLInputElement>) => {
          dispatch(RegisterEmail(event.target.value));
        }}
      />
      <label htmlFor="password">Votre mot de passe</label>
      <input
        id="password"
        type="password"
        className="text-dark ps-3 pe-3"
        required
        minLength={6}
        value={passwordRegister}
        onChange={(event: ChangeEvent<HTMLInputElement>) => {
          dispatch(RegisterPassword(event.target.value));
        }}
      />
      <label htmlFor="pseudo">Votre pseudo</label>
      <input
        id="pseudo"
        value={username}
        className="text-dark ps-3 pe-3"
        required
        onChange={(event: ChangeEvent<HTMLInputElement>) => {
          dispatch(RegisterUsername(event.target.value));
        }}
      />
      <div className="d-flex justify-content-center align-items-center mt-4 mb-3 w-100 m-auto">
        <input
          className="form-check-input me-1 m-auto p-2"
          type="checkbox"
          id="rgpd"
          required
        />
        <label className="m-auto ms-4 form-check-label" htmlFor="rgpd">
          J'accepte les conditions d'utilisation &nbsp;
          <NavLink to="/cgu" target="_blank">
            (disponibles ici)
          </NavLink>
        </label>
      </div>
      <button type="submit" className="btn btn-primary mt-2 w-50">
        Creez votre compte
      </button>
    </form>
  );
};
export default RegisterForm;
