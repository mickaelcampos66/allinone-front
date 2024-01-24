import { createAction } from '@reduxjs/toolkit';

export const ChangeEmail = createAction<string>('CHANGE_EMAIL');
export const ChangePassword = createAction<string>('CHANGE_PASSWORD');

export const ChangeUsername = createAction<string>('CHANGE_USERNAME');
