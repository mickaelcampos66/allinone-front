import { createAsyncThunk } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import { RootState } from '../store';
import instanceAxios from '../utils/axios';

const checkUser: any = createAsyncThunk(
  'CHECK_USER',

  async (_, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;
    const user = state.User;
    // POST request to connect user
    // email & password in body
    const result = await instanceAxios.post('/login', {
      email: user.email,
      password: user.password,
    });

    // if request ok, store datas in localStorage
    window.localStorage.setItem('token', result.data.token);
    window.localStorage.setItem('userId', result.data.userId);
    window.localStorage.setItem('userEmail', result.data.userEmail);
    window.localStorage.setItem('roles', result.data.roles);
    window.localStorage.setItem('username', result.data.username);
    // add token in axios headers for every request
    instanceAxios.defaults.headers.common.Authorization = `Bearer ${result.data.token}`;

    return result.data;
  }
);

export default checkUser;
