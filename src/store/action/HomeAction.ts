import { createAction } from '@reduxjs/toolkit';

export const WindowResize = createAction<number>('WINDOW_RESIZE');
