import { Movie } from '../../types/movie.type';

export function createMovie(movieData: string): Movie {
  const [
    name,
    description,
    premiereDate,
    genre,
    released,
    rating,
    previewVideoLink,
    videoLink,
    starring,
    director,
    runTime,
    posterImage,
    backgroundImage,
    backgroundColor,
    firstName,
    lastName,
    email
  ] = movieData.replace('\n', '').split('\t');

  const user = {
    email,
    firstName,
    lastName
  };

  return {
    name,
    description,
    premiereDate: new Date(premiereDate),
    genre,
    released: parseInt(released,10),
    rating: parseInt(rating, 10),
    previewVideoLink,
    videoLink,
    starring: starring.split(';').map((artistName) => (artistName)),
    director,
    runTime: parseInt(runTime, 10),
    posterImage,
    backgroundImage,
    backgroundColor: parseInt(backgroundColor, 16),
    user
  } as unknown as Movie;
}
