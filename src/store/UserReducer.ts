import { createReducer } from '@reduxjs/toolkit';
import {
  EmailForm,
  isLogin,
  Logout,
  PasswordForm,
  RegisterEmail,
  RegisterPassword,
  RegisterUsername,
} from './action/AuthentificationAction';
// eslint-disable-next-line import/no-cycle
import checkUser from './thunk/authentification';
// eslint-disable-next-line import/no-cycle
import {
  ChangeEmail,
  ChangePassword,
  ChangeUsername,
} from './action/ProfilsAction';
// eslint-disable-next-line import/no-cycle
import ModifUser from './thunk/Profils';

import { fetchFavoris } from './thunk/Favs';

// typage de du user reducer

interface UserReducer {
  email: string;
  password: string;
  isLoggin: boolean;
  user: [];
  userId: null | number;
  token: string | null;
  Register: {
    registerEmail: string;
    registerPassword: string;
    username: string;
  };
  Profil: {
    email: string;
    password: string | null;
    username: string;
  };
  Favoris: [];
}

const initialState: UserReducer = {
  email: '',
  password: '',
  isLoggin: false,
  user: [],
  userId: null,
  token: null,
  Register: {
    registerEmail: '',
    registerPassword: '',
    username: '',
  },
  Profil: {
    email: localStorage.getItem('userEmail') || '',
    password: null,
    username: localStorage.getItem('username') || '',
  },
  Favoris: [],
};
const UsersReducer = createReducer(initialState, (builder) => {
  builder
    // Gestion du formulaire de login
    .addCase(EmailForm, (state, action) => {
      state.email = action.payload;
    })
    .addCase(PasswordForm, (state, action) => {
      state.password = action.payload;
    })
    //* ************************************

    // Si le login est reussi
    .addCase(checkUser.fulfilled, (state, action) => {
      if (localStorage.getItem('token')) {
        // On passe isLoggin a true si on a bien le token dans le local storage
        state.isLoggin = true;
      }
      // On stock les données du user dans des state
      state.user = action.payload;
      state.userId = action.payload.userId;

      state.token = action.payload.token;
      // on stock le email et le username pour le préremplissge du formulaire de la page profil
      state.Profil.email = action.payload.userEmail;
      state.Profil.username = action.payload.username;
      console.log(action);
    })

    .addCase(checkUser.rejected, (state, action) => {
      // si l'appel a l'api est rejeter on affiche une erreur
      alert('Utilisateur non trouvé. Veuillez réessayer  ');
    })

    .addCase(Logout, (state, action) => {
      // Lors de la deconnexion on vide le localStorage et les state des information de l'utlisateur
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
      localStorage.removeItem('userEmail');
      localStorage.removeItem('roles');
      localStorage.removeItem('username');
      state.token = null;
      state.isLoggin = false;
      state.user = [];
      state.Profil.email = '';
      state.Profil.password = null;
      state.Profil.username = '';
    })
    // ********* Gestion des formulaire d'enregistrement
    .addCase(RegisterEmail, (state, action) => {
      state.Register.registerEmail = action.payload;
    })
    .addCase(RegisterPassword, (state, action) => {
      state.Register.registerPassword = action.payload;
    })
    .addCase(RegisterUsername, (state, action) => {
      state.Register.username = action.payload;
    })
    //* *************************************************

    // Action effectuée lors du rafraîchissement d'une page : vérifie si l'utilisateur est connecté en vérifiant la présence du jeton (token).
    .addCase(isLogin, (state, action) => {
      if (localStorage.getItem('token')) {
        state.isLoggin = true;
      }
    })
    // ***** Gestion des formulaire de la page de Profil
    .addCase(ChangeEmail, (state, action) => {
      state.Profil.email = action.payload;
    })
    .addCase(ChangePassword, (state, action) => {
      state.Profil.password = action.payload;
    })
    .addCase(ChangeUsername, (state, action) => {
      state.Profil.username = action.payload;
    })
    // **************************************************

    // Si la modification des information est reussi
    .addCase(ModifUser.fulfilled, (state, action) => {
      // On previent l'utilisateur avec une alert
      // et on modifie les information dans le local storage
      localStorage.setItem('username', state.Profil.username);
      localStorage.setItem('userEmail', state.Profil.email);
    })
    .addCase(ModifUser.rejected, (state, action) => {
      console.log(action);
    })
    .addCase(fetchFavoris.fulfilled, (state, action) => {
      state.Favoris = action.payload;
    });
});

export default UsersReducer;
