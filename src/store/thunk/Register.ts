import { createAsyncThunk } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import { useNavigate } from 'react-router-dom';
import { RootState } from '../store';
import instanceAxios from '../utils/axios';

const RegisterUser: any = createAsyncThunk(
  'REGISTER_USER',

  async (_, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;
    const user = state.User;
    try {
      const result = await instanceAxios.post('/register', {
        email: user.Register.registerEmail,
        password: user.Register.registerPassword,
        username: user.Register.username,
      });
      alert('Inscription terminée... Connectez vous désormais !');

      return result.data;
    } catch (error: any) {
      alert(error.response.data.message);
    }
  }
);

export default RegisterUser;
