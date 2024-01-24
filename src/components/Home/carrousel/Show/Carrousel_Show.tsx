import { Link } from 'react-router-dom';
import '../style/Carrousel.scss';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../store/store';

const Carousel = () => {
  const listShow = useSelector((state: RootState) => state.Home.listShow);

  const Top = listShow.slice(0, 10);
  return (
    <div className="Carousel mt-2 pt-2 pb-2">
      <div
        id="CarouselShows"
        className="carousel slide m-auto widthCarousel"
        data-bs-ride="false"
      >
        <div className="carousel-indicators">
          {Top.map((media: any, index: any) => {
            return (
              <button
                key={media.id}
                type="button"
                data-bs-target="#CarouselShows"
                data-bs-slide-to={index}
                className="active"
                aria-current="true"
                aria-label="Slide 1"
              />
            );
          })}
        </div>

        <div className="carousel-inner ">
          {Top.map((media: any, index: any) => {
            if (index === 0) {
              return (
                <div className="carousel-item active" key={media.id}>
                  <Link to={`details/${media.id}`}>
                    <img
                      src={media.picture}
                      className="d-block picture  rounded shadow-lg "
                      alt={media.title}
                    />
                  </Link>
                </div>
              );
            }
            return (
              <div className="carousel-item" key={media.id}>
                <Link to={`details/${media.id}`}>
                  <img
                    src={media.picture}
                    className="d-block picture  "
                    alt={media.title}
                  />
                </Link>
              </div>
            );
          })}
        </div>
        <button
          className="carousel-control-prev  "
          type="button"
          data-bs-target="#CarouselShows"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon arrow-left"
            aria-hidden="true"
          />
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#CarouselShows"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon arrow-right"
            aria-hidden="true"
          />
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  );
};

export default Carousel;
