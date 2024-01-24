import { Link } from 'react-router-dom';
import './Type.scss';
// Typage des Props
interface Types {
  title: string;
  picture: string;
  summary: string;
  id: number;
}
const Type = ({ title, picture, summary, id }: Types) => {
  return (
    <div className="card  bg-dark text-light">
      <img src={picture} className="card-img-top " alt={title} />
      <div className="card-header">
        {' '}
        <h5 className="card-title">{title}</h5>
      </div>
      <div className="card-body">
        <p className="card-text">{summary}</p>
      </div>
      <div className="card-footer">
        <Link to={`/details/${id}`} className="btn btn-primary">
          Voir plus
        </Link>
      </div>
    </div>
  );
};

export default Type;
