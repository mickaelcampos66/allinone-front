import { createAction } from '@reduxjs/toolkit';

export const EmailForm = createAction<string>('EMAIL_FORM');
export const PasswordForm = createAction<string>('PASSWORD_FORM');

export const Logout = createAction('LOGOUT');
export const RegisterEmail = createAction<string>('REGISTER_EMAIL');
export const RegisterPassword = createAction<string>('REGISTER_PASSWORD');
export const RegisterUsername = createAction<string>('REGISTER_USERNAME');
export const isLogin = createAction('LOGIN');
