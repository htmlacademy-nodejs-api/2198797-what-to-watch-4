import CreateUserDto from '../dto/user/create-user.dto';
import { NewUser } from '../types/new-user';
import { NewFilm } from '../types/new-film';
import CreateMovieDto from '../dto/movie/create-movie.dto';
import { NewReview } from '../types/new-review';
import CreateCommentDto from '../dto/comment/create-comment.dto';

export const adaptUserToServer =
  (user: NewUser): CreateUserDto => ({
    firstName: user.name,
    lastName: user.name,
    email: user.email,
    password: user.password,
  });

export const adaptMovieToServer =
  (movie: NewFilm): CreateMovieDto => ({
    ...movie, genre:[movie.genre]
  });

export const adaptCommentToServer =
  (comment: NewReview, movieId: string): CreateCommentDto => ({
    ...comment, movieId:movieId
  });
