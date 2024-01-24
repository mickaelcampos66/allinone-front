import { createAction } from '@reduxjs/toolkit';

export const inputTitle = createAction<string>('INPUT_TITLE');
export const inputContent = createAction<string>('INPUT_CONTENT');
export const inputRating = createAction<number>('INPUT_RATING');
