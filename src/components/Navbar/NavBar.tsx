import React, { useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import categories from '../../store/data/data';
import { displayMenu, MenuShow } from '../../store/action/NavBarAction';
import { Logout } from '../../store/action/AuthentificationAction';
import './Navbar.scss';

const NavBar = () => {
  const dispatch = useDispatch();
  const displayMenue = useSelector(
    (state: RootState) => state.Navbar.menuHidden
  );
  const isLoggin = useSelector((state: RootState) => state.User.isLoggin);

  const display = () => {
    const action = displayMenu();
    dispatch(action);
  };
  const handleclick = () => {
    dispatch(Logout());
  };

  let hasAccessToBack = false;
  // store user role in local storage
  const role = localStorage.getItem('roles');
  // grant accessToBackOffice button if user is admin or catalog manager
  if (
    role &&
    (role.includes('ROLE_ADMIN') || role.includes('ROLE_CATALOG_MANAGER'))
  ) {
    hasAccessToBack = true;
  }

  useEffect(() => {
    if (window.innerWidth >= 1024) {
      dispatch(MenuShow());
    }

    window.addEventListener('resize', () => {
      if (window.innerWidth >= 1024) {
        dispatch(MenuShow());
      }
    });
  }, [dispatch]);
  return (
    <div className="NavBar">
      <div className="container-fluid  pt-2 pb-2 bg-blue">
        <nav className="row  justify-content-between align-items-center">
          <div className="col-1">
            {/*  Link & Navlink instead of <a> in react-router  */}
            <Link className="navbar-brand text-warning fw-boldyar fs-2" to="/">
              AllinOne
            </Link>
          </div>

          <button
            type="button"
            className="btn btn-primary button-burger button"
            onClick={display}
          >
            {displayMenue ? (
              <i className="fa-solid fa-bars" />
            ) : (
              <i className="fa-solid fa-xmark" />
            )}
          </button>

          <div className="col-6">
            {/* Show or hide MenuBurger depending on displayMenue value
             */}
            <ul
              className={
                displayMenue
                  ? 'cacher'
                  : 'link d-flex align-items-center  pt-3  '
              }
            >
              {categories.map(
                // eslint-disable-next-line no-return-assign
                (link) => (
                  // eslint-disable-next-line no-param-reassign,no-sequences
                  link === 'JV' ? (link = 'Jeux-video') : link,
                  (
                    <li key={link.toLowerCase()} className="ms-1">
                      <NavLink
                        className="link-nav"
                        to={`list/${link.toLowerCase()}`}
                      >
                        {link === 'Jeux-video' ? 'JV' : link}
                      </NavLink>
                    </li>
                  )
                )
              )}
              <li className="auth-mobile">
                {hasAccessToBack && (
                  <NavLink
                    className="link-nav"
                    to="https://allinone.yannicksendrey.dev/backoffice"
                    target="_blank"
                  >
                    Backoffice
                  </NavLink>
                )}
              </li>
              <li className="auth-mobile">
                {isLoggin ? (
                  <Link to="/profils" className="link-nav">
                    Profil
                  </Link>
                ) : (
                  ''
                )}
              </li>
              <li className="auth-mobile">
                {isLoggin ? (
                  <Link to="/favoris" className="link-nav">
                    Favoris
                  </Link>
                ) : (
                  ''
                )}
              </li>
              <li className="auth-mobile">
                {isLoggin ? (
                  <Link to="/" onClick={handleclick} className="link-nav">
                    Deconnexion
                  </Link>
                ) : (
                  <NavLink to="login" className="link-nav ">
                    Connexion
                  </NavLink>
                )}
              </li>
            </ul>
          </div>
          <div className="auth-desktop col-3 d-flex gap-4">
            <li className="auth-desktop">
              {hasAccessToBack && (
                <NavLink
                  className="link-nav"
                  to="https://allinone.yannicksendrey.dev/login"
                  target="_blank"
                >
                  Backoffice
                </NavLink>
              )}
            </li>
            <li className="auth-desktop">
              {isLoggin ? (
                <Link to="/profils" className="link-nav">
                  Profil
                </Link>
              ) : (
                ''
              )}
            </li>
            <li className="auth-desktop">
              {isLoggin ? (
                <Link to="/favoris" className="link-nav">
                  Favoris
                </Link>
              ) : (
                ''
              )}
            </li>
            <li className="auth-desktop">
              {isLoggin ? (
                <Link to="/" onClick={handleclick} className="link-nav">
                  Deconnexion
                </Link>
              ) : (
                <NavLink to="login" className="link-nav ">
                  Connexion
                </NavLink>
              )}
            </li>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default NavBar;
