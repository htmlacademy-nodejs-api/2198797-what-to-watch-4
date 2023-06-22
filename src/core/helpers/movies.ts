import { Movie } from '../../types/movie.type';

export function createMovie(movieData: string): Movie {
  const [
    name,
    description,
    premiereDate,
    genre,
    released,
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
    genre: genre.split(';').map((genreName) => (genreName)),
    released: parseInt(released, 10),
    rating: 0,
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
