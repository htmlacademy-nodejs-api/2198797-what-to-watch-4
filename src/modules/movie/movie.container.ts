import { Container } from 'inversify';
import { types } from '@typegoose/typegoose';
import { AppComponent } from '../../types/app-component.enum.js';
import MovieService from './movie.service.js';
import { MovieEntity, MovieModel } from './movie.entity.js';
import { MovieServiceInterface } from './movie-service.interface';

export function createMovieContainer() {
  const movieContainer = new Container();

  movieContainer.bind<MovieServiceInterface>(AppComponent.MovieServiceInterface).to(MovieService);
  movieContainer.bind<types.ModelType<MovieEntity>>(AppComponent.MovieModel).toConstantValue(MovieModel);

  return movieContainer;
}
