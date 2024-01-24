import { createReducer } from '@reduxjs/toolkit';
import { displayMenu, MenuShow } from './action/NavBarAction';

interface NavBarState {
  menuHidden: boolean;
}
const initialState: NavBarState = {
  menuHidden: true,
};

const reducerNavBar = createReducer(initialState, (builder) => {
  builder
    .addCase(displayMenu, (state, action) => {
      state.menuHidden = !state.menuHidden;
    })
    .addCase(MenuShow, (state, action) => {
      state.menuHidden = false;
    });
});

export default reducerNavBar;
