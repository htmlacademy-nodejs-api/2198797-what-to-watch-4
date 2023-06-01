import { Container } from 'inversify';
import { types } from '@typegoose/typegoose';
import { AppComponent } from '../../types/app-component.enum.js';
import MovieService from './movie.service.js';
import { MovieEntity, MovieModel } from './movie.entity.js';
import { MovieServiceInterface } from './movie-service.interface';
import MovieController from './movie.controller.js';
import { ControllerInterface } from '../../core/controller/controller.interface';

export function createMovieContainer() {
  const movieContainer = new Container();

  movieContainer.bind<MovieServiceInterface>(AppComponent.MovieServiceInterface).to(MovieService);
  movieContainer.bind<types.ModelType<MovieEntity>>(AppComponent.MovieModel).toConstantValue(MovieModel);
  movieContainer.bind<ControllerInterface>(AppComponent.MovieController).to(MovieController).inSingletonScope();

  return movieContainer;
}
