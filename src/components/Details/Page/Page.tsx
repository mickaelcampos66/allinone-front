import { useDispatch, useSelector } from 'react-redux';
import { ChangeEvent, useEffect } from 'react';
import { RootState } from '../../../store/store';
import { WindowResize } from '../../../store/action/HomeAction';
import './Page.scss';
import {
  inputContent,
  inputRating,
  inputTitle,
} from '../../../store/action/reviewsAction';

import { ReviewsForm } from '../../../store/thunk/reviews';
import { Link } from 'react-router-dom';
import { AddFavs } from '../../../store/thunk/Favs';

const Page = () => {
  // useSelector stores windowSize state in a "size" variable
  const size: number = useSelector((state: RootState) => state.Home.windowSize);

  // details state is stored in a "oeuvre" variable
  const oeuvre = useSelector((state: RootState) => state.Details.oeuvre);

  // Filter reviews to get only validated reviews (isValidated = true)
  const validatedReviews = oeuvre.reviews.filter(
    (review: any) => review.isValidated === true
  );

  // Boolean to check if user is logged in
  const isLogin = useSelector((state: RootState) => state.User.isLoggin);

  const rate = useSelector(
    (state: RootState) => state.Details.ReviewFrom.rating
  );

  const dispatch = useDispatch();

  // handle rate select input
  const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const inputvalue = parseInt(event.target.value, 10);

    dispatch(inputRating(inputvalue));
  };

  // useEffect fills windowSize state on first render and on window resize
  useEffect(() => {
    dispatch(WindowResize(window.innerWidth));
  }, [dispatch]);

  window.addEventListener('resize', () => {
    dispatch(WindowResize(window.innerWidth));
  });

  if (size >= 1024) {
    return (
      <div className="Page w-75 m-auto ">
        <div className="w-75 text-center ">
          <h2 className="mb-4">{oeuvre.title}</h2>
        </div>
        <div className="d-flex m-auto">
          <div id="Poster">
            <img
              src={oeuvre.picture}
              alt="poster-img-movie"
              className="mb-5 me-5"
            />
            {isLogin ? (
              <button
                type="button"
                className="btn btn-danger  btn-favs "
                onClick={() => {
                  dispatch(AddFavs(oeuvre.id));
                }}
              >
                <i className="fa-solid fa-heart" />
              </button>
            ) : (
              <h6>Se connecter pour ajouter au favoris </h6>
            )}
          </div>

          <div className="block-detail ms-3 ">
            <div className="synopsis mt-0 w-100">
              <h3 className="p-3">Synopsis</h3>
              {oeuvre.synopsis ? (
                <p className="p-3">{oeuvre.synopsis}</p>
              ) : (
                <p className="p-3">pas de synopsis </p>
              )}
            </div>
            <div className="">
              <ul className="p-0">
                {oeuvre.authors
                  ? oeuvre.authors.map((auteur: any) => {
                      return (
                        <li className="mb-2" key={auteur.id}>
                          <span className="fw-bold">
                            {auteur.position.charAt(0).toUpperCase() +
                              auteur.position.slice(1)}
                          </span>
                          : {auteur.fullname}
                        </li>
                      );
                    })
                  : ''}

                <li>
                  <span className="fw-bold">Genres</span>:{' '}
                  {oeuvre.genres
                    ? oeuvre.genres.map((genre: any, index: number) => {
                        if (index === oeuvre.genres.length - 1) {
                          return `${genre.name}`;
                        }
                        return `${genre.name}, `;
                      })
                    : ''}
                </li>
              </ul>
            </div>
            <div className="Acteurs  text-light">
              {(oeuvre.category.name === 'film' ||
                oeuvre.category.name === 'serie') &&
              oeuvre.characters.filter(
                (character: any) => character.actors.length > 0
              ).length > 0 ? (
                <div>
                  <h4>Les acteurs principaux</h4>
                  <div className="d-flex ">
                    {oeuvre.characters
                      ? oeuvre.characters.map((perso: any) => {
                          return perso.actors.map((acteur: any) => {
                            return (
                              <div
                                key={perso.id}
                                className=" m-3 w-25 text-center d-flex flex-column justify-content-center align-items-center gap-2"
                              >
                                <img
                                  className="w-50 h-50"
                                  src={acteur.picture}
                                  alt={` ${acteur.firstname} ${acteur.lastname}`}
                                />
                                <h6 className="">
                                  {' '}
                                  {`${acteur.firstname} ${acteur.lastname} - ${
                                    acteur.nationality.charAt(0).toUpperCase() +
                                    acteur.nationality.slice(1)
                                  }`}{' '}
                                </h6>
                                <h6 key={acteur.id}>Role: {perso.role}</h6>
                              </div>
                            );
                          });
                        })
                      : ''}
                  </div>
                </div>
              ) : (
                <div>
                  <h4>Les personnages principaux</h4>
                  <div className="d-flex gap-1">
                    {oeuvre.characters
                      ? oeuvre.characters.map((perso: any, index: number) => {
                          return index === 0 ? (
                            <p key={perso.id}>{perso.role} -</p>
                          ) : (
                            <p key={perso.id}>{perso.role}</p>
                          );
                        })
                      : ''}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="d-flex flex-row-reverse align-items-start mt-4">
          <div className="ms-5 w-100" id="reviews">
            {validatedReviews.length > 0 ? (
              <h4 className=" text-center w-75 mb-3">Critiques</h4>
            ) : (
              ''
            )}
            {validatedReviews.length > 0 ? (
              validatedReviews.map((review: any) => {
                return (
                  <div
                    key={review.id}
                    className="container m-1 p-2 border rounded w-75 bg-opacity-25 ms-0 mb-3"
                  >
                    <div className="d-flex justify-content-evenly">
                      <div className="d-flex flex-column justify-content-center">
                        <h5 className="text-center">"{review.title}"</h5>
                        <h6 className="text-light text-center">
                          Auteur : {review.user_review.username}
                        </h6>
                      </div>
                      <div className="d-flex flex-column justify-content-center mt-2">
                        <h6 className="text-center">{review.rating} / 5</h6>
                        <p className="text-center">{review.content}</p>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <h4>Aucune critique</h4>
            )}
            {isLogin ? (
              ''
            ) : (
              <h5 className="text-center">
                <Link to="/login">Connectez-vous</Link> pour laisser une
                critique{' '}
              </h5>
            )}
          </div>

          {/* Display addReview form if user is logged in */}
          {isLogin ? (
            <form
              className=" align-items-center justify-content-center  w-75 border border-warning rounded"
              onSubmit={(event) => {
                event.preventDefault();
                dispatch(ReviewsForm(oeuvre.id));
              }}
            >
              <h4 className="mt-3">Ajoutez votre critique</h4>
              <div className=" d-flex align-items-end justify-content-center gap-2  w-100 ms-3">
                <div className="ms-5 d-flex flex-column text-center">
                  <label
                    htmlFor="exampleInputTitle"
                    className="form-label w-100 "
                  >
                    Titre
                  </label>
                  <input
                    type="text"
                    className="form-control inputForm"
                    id="exampleInputTitle"
                    aria-describedby="title"
                    onChange={(event: ChangeEvent<HTMLInputElement>) => {
                      dispatch(inputTitle(event.target.value));
                    }}
                  />
                </div>
                <div className="w-50">
                  <label
                    htmlFor="rating"
                    className="form-label pb-2 text-center"
                  >
                    Note
                  </label>
                  <select
                    value={rate}
                    id="rating"
                    className="form-select inputForm w-50 "
                    aria-label="Default select example"
                    onChange={handleSelectChange}
                  >
                    <option value="0">0</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </select>
                </div>
              </div>
              <div className="mb-5 m-auto w-100  text-center">
                <label
                  htmlFor="exampleInputCommentaire"
                  className="form-label text-center pb-2"
                >
                  Votre commentaire
                </label>
                <textarea
                  className="form-control w-75 m-auto h-75"
                  id="exampleInputCommentaire"
                  onChange={(event: ChangeEvent<HTMLTextAreaElement>) => {
                    dispatch(inputContent(event.target.value));
                  }}
                />
              </div>
              <button type="submit" className="btn btn-warning mt-2 mb-3">
                Submit
              </button>
            </form>
          ) : (
            ''
          )}
        </div>
      </div>
    );
  }
  return (
    <div className="Page text-center">
      <div className=" container  ">
        <div className="row  ">
          <h2 className="fs-5 text-center">{oeuvre.title}</h2>
        </div>
        <div className="row" id="Poster">
          <div className="d-flex flex-column">
            <img
              src={oeuvre.picture}
              alt="poster-img-movie"
              className="m-auto w-50"
            />
            {isLogin ? (
              <button
                type="button"
                className="mt-4 btn btn-danger w-50 m-auto btn-favs "
                onClick={() => {
                  dispatch(AddFavs(oeuvre.id));
                }}
              >
                <i className="fa-solid fa-heart" />
              </button>
            ) : (
              <h6>Se connecter pour ajouter au favoris </h6>
            )}
          </div>
        </div>
      </div>
      <div className="block-detail ">
        <div className="synopsis">
          <h3 className="p-3">Synopsis</h3>
          {oeuvre.synopsis ? (
            <p className="p-2">{oeuvre.synopsis}</p>
          ) : (
            <p className="p-2">pas de synopsis </p>
          )}
        </div>
        <div className="">
          <ul className="p-0">
            {oeuvre.authors
              ? oeuvre.authors.map((auteur: any) => {
                  return (
                    <li className="mb-2" key={auteur.id}>
                      <span className="fw-bold">
                        {auteur.position.charAt(0).toUpperCase() +
                          auteur.position.slice(1)}
                      </span>
                      : {auteur.fullname}
                    </li>
                  );
                })
              : ''}

            <li>
              <span className="fw-bold">Genres</span>:{' '}
              {oeuvre.genres
                ? oeuvre.genres.map((genre: any, index: number) => {
                    if (index === oeuvre.genres.length - 1) {
                      return `${genre.name}`;
                    }
                    return `${genre.name}, `;
                  })
                : ''}
            </li>
          </ul>
        </div>
        <div className="Acteurs  text-light">
          {(oeuvre.category.name === 'film' ||
            oeuvre.category.name === 'serie') &&
          oeuvre.characters.filter(
            (character: any) => character.actors.length > 0
          ).length > 0 ? (
            <div>
              <h4>Les acteurs principaux</h4>
              <div className="d-flex ">
                {oeuvre.characters
                  ? oeuvre.characters.map((perso: any) => {
                      return perso.actors.map((acteur: any) => {
                        return (
                          <div key={perso.id}>
                            <img
                              className="w-25"
                              src={acteur.picture}
                              alt={` ${acteur.firstname} ${acteur.lastname}`}
                            />
                            <h6 className="">
                              {' '}
                              {`${acteur.firstname} ${acteur.lastname} - ${
                                acteur.nationality.charAt(0).toUpperCase() +
                                acteur.nationality.slice(1)
                              }`}{' '}
                            </h6>
                            <h6 key={acteur.id}>Role: {perso.role}</h6>
                          </div>
                        );
                      });
                    })
                  : ''}
              </div>
            </div>
          ) : (
            <div>
              <h4>Les personnages principaux</h4>
              <div className="mt-4">
                {oeuvre.characters
                  ? oeuvre.characters.map((perso: any, index: number) => {
                      return index === 0 ? (
                        <div key={perso.id}>
                          <p>{perso.role}</p>
                          <p>-</p>
                        </div>
                      ) : (
                        <p key={perso.id}>{perso.role}</p>
                      );
                    })
                  : ''}
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="w-100 mt-4" id="reviews-mobile">
        {validatedReviews.length > 0 ? (
          <h4 className=" text-center  mb-3">Critiques</h4>
        ) : (
          ''
        )}
        {validatedReviews.length > 0 ? (
          validatedReviews.map((review: any) => {
            return (
              <div
                key={review.id}
                className="container m-auto p-2 border border w-75 bg-opacity-25  mb-3"
              >
                <div className="d-flex justify-content-evenly">
                  <div className="d-flex flex-column justify-content-center">
                    <h5 className="text-center">"{review.title}"</h5>
                    <h6 className="text-light text-center">
                      Auteur : {review.user_review.username}
                    </h6>
                  </div>
                  <div className="d-flex flex-column justify-content-center mt-2">
                    <h6 className="text-center">{review.rating} / 5</h6>
                    <p className="text-center">{review.content}</p>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <h4>Aucune critique </h4>
        )}
        {isLogin ? (
          ''
        ) : (
          <h5 className="me-5">
            <Link className="text-start" to="/login">
              Connectez-vous
            </Link>{' '}
            pour laisser une critique{' '}
          </h5>
        )}
      </div>
      {isLogin ? (
        <form
          className=" align-items-center justify-content-center  w-75 border border-warning rounded m-auto mt-5 ms-5"
          onSubmit={(event) => {
            event.preventDefault();
            dispatch(ReviewsForm(oeuvre.id));
          }}
        >
          <h4 className="mt-3">Ajoutez votre critique</h4>
          <div className=" d-flex align-items-end justify-content-center gap-2  w-100">
            <div className="ms-4 d-flex flex-column text-center">
              <label htmlFor="exampleInputTitle" className="form-label w-100 ">
                Titre
              </label>
              <input
                type="text"
                className="form-control inputForm"
                id="exampleInputTitle"
                aria-describedby="title"
                onChange={(event: ChangeEvent<HTMLInputElement>) => {
                  dispatch(inputTitle(event.target.value));
                }}
              />
            </div>
            <div className="w-50">
              <label htmlFor="rating" className="form-label pb-3 text-center">
                Note
              </label>
              <select
                value={rate}
                id="rating"
                className="form-select inputForm w-75 "
                aria-label="Default select example"
                onChange={handleSelectChange}
              >
                <option value="0">0</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
            </div>
          </div>
          <div className="mb-5 m-auto w-100  text-center">
            <label
              htmlFor="exampleInputCommentaire"
              className="form-label text-center pb-2"
            >
              Votre commentaire
            </label>
            <textarea
              className="form-control w-75 m-auto h-75"
              id="exampleInputCommentaire"
              onChange={(event: ChangeEvent<HTMLTextAreaElement>) => {
                dispatch(inputContent(event.target.value));
              }}
            />
          </div>
          <button type="submit" className="btn btn-warning mt-2 mb-3">
            Submit
          </button>
        </form>
      ) : (
        ''
      )}
    </div>
  );
};

export default Page;
