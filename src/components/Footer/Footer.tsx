import { Link } from 'react-router-dom';
import './Footer.scss';

const Footer = () => {
  return (
    <footer className="bg-blue w-100">
      <ul className="d-flex p-0 mb-0 align-items-center">
        <li className="m-2">
          <Link to="legal">Mentions Légales</Link>
        </li>
        <li className="m-2 ">
          <Link to="cgu">Conditions générales d'utilisation</Link>
        </li>
      </ul>
    </footer>
  );
};
export default Footer;
