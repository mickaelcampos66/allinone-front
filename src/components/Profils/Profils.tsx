import './Profils.scss';
import { useDispatch, useSelector } from 'react-redux';
import { ChangeEvent, useState } from 'react';
import { RootState } from '../../store/store';
import {
  ChangeEmail,
  ChangePassword,
  ChangeUsername,
} from '../../store/action/ProfilsAction';
import ModifUser from '../../store/thunk/Profils';

const Profils = () => {
  const dispatch = useDispatch();
  const username = useSelector(
    (state: RootState) => state.User.Profil.username
  );
  const [welcomeUsername, setWelcomeUsername] = useState<string>(username);
  const email = useSelector((state: RootState) => state.User.Profil.email);

  return (
    <div className="Profils w-50 m-auto pt-5 mt-5">
      <h1 className="text-center  text-light">Bienvenue {welcomeUsername}</h1>

      <form
        className="mt-2"
        onSubmit={(event) => {
          event.preventDefault();
          setWelcomeUsername(username);
          dispatch(ModifUser());
        }}
      >
        <h2 className="text-light">Modifiez vos informations personelles</h2>
        <div className="form-group">
          <label htmlFor="InputEmail">votre adresse mail</label>
          <input
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
              dispatch(ChangeEmail(event.target.value));
            }}
            value={email}
            type="email"
            className="form-control"
            id="InputEmail"
            aria-describedby="emailHelp"
            placeholder="adresse mail"
          />
        </div>
        <div className="form-group">
          <label htmlFor="InputPassword">votre mot de passe</label>
          <input
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
              dispatch(ChangePassword(event.target.value));
            }}
            type="password"
            className="form-control"
            id="InputPassword"
            placeholder="Mot de passe "
            minLength={6}
          />
        </div>
        <div className="form-group">
          <label htmlFor="InputUsername">votre pseudo </label>
          <input
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
              dispatch(ChangeUsername(event.target.value));
            }}
            value={username}
            type="text"
            className="form-control"
            id="InputUsername"
            placeholder="Pseudo"
          />
        </div>
        <button type="submit" className="btn mt-5 btn-primary">
          Soumettre
        </button>
      </form>
    </div>
  );
};
export default Profils;
