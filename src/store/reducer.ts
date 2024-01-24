import reducerNavBar from './NavBarReducer';
import HomeReducer from './HomeReducer';
import DetailsReducer from './DetailsReducer';
import UsersReducer from './UserReducer';
import ListReducer from './ListReducer';

const reducer = {
  Navbar: reducerNavBar,
  Home: HomeReducer,
  Details: DetailsReducer,
  User: UsersReducer,
  List: ListReducer,
};

export default reducer;
