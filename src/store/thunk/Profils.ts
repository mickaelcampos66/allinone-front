import { createAsyncThunk } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import { RootState } from '../store';
// Change user credentials request
const ModifUser: any = createAsyncThunk(
  'MODIFICATION_USER',

  // eslint-disable-next-line consistent-return
  async (_, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;
    // get user id
    const userId = Number(localStorage.getItem('userId'));
    // get form datas
    const profils = state.User.Profil;

    // Route API

    const url = 'https://allinone.yannicksendrey.dev/api/users/update';

    try {
      const result = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          email: profils.email,
          password: profils.password,
          username: profils.username,
        }),
      });

      if (result.ok) {
        alert('Modification bien effectuée');
      }

      const data = await result.json();

      if (data.message !== 'Vos informations ont bien été mises à jour') {
        alert(data.message);
      }

      return data;
    } catch (error) {
      console.log();
    }
  }
);

export default ModifUser;
