import { inject, injectable } from 'inversify';
import { Request, Response } from 'express';
import { Controller } from '../../core/controller/controller.abstract.js';
import { LoggerInterface } from '../../core/logger/logger.interface.js';
import { AppComponent } from '../../types/app-component.enum.js';
import { HttpMethod } from '../../types/http-method.enum.js';
import { MovieServiceInterface } from './movie-service.interface.js';
import { fillDTO } from '../../core/helpers/common.js';
import MoviesRdo from './rdo/movies.rdo.js';
import MovieRdo from './rdo/movie.rdo.js';
import CreateMovieDto from './dto/create-movie.dto.js';
import * as core from 'express-serve-static-core';
import UpdateMovieDto from './dto/update-movie.dto.js';
import { CommentServiceInterface } from '../comment/comment-service.interface.js';
import CommentRdo from '../comment/rdo/comment.rdo.js';
import { ValidateObjectIdMiddleware } from '../../core/middlewares/validate-objectid.middleware.js';
import { ValidateDtoMiddleware } from '../../core/middlewares/validate-dto.middleware.js';
import { DocumentExistsMiddleware } from '../../core/middlewares/document-exists.middleware.js';
import { ValidateGenreMiddleware } from '../../core/middlewares/validate-genre.middleware.js';
import { RequestQuery } from '../../types/request-query.type.js';

type ParamsGetMovie = {
  movieId: string;
}

type ParamsGetGenre = {
  genre: string;
}


@injectable()
export default class MovieController extends Controller {
  constructor(
    @inject(AppComponent.LoggerInterface) logger: LoggerInterface,
    @inject(AppComponent.MovieServiceInterface) private readonly movieService: MovieServiceInterface,
    @inject(AppComponent.CommentServiceInterface) private readonly commentService: CommentServiceInterface,
  ) {
    super(logger);

    this.logger.info('Register routes for CategoryController…');

    this.addRoute({path: '/', method: HttpMethod.Get, handler: this.index});
    this.addRoute({
      path: '/',
      method: HttpMethod.Post,
      handler: this.create,
      middlewares: [new ValidateDtoMiddleware(CreateMovieDto)]});
    this.addRoute({
      path: '/:movieId',
      method: HttpMethod.Get,
      handler: this.show,
      middlewares: [
        new ValidateObjectIdMiddleware('movieId'),
        new DocumentExistsMiddleware(this.movieService, 'Movie', 'movieId')
      ]
    });
    this.addRoute({
      path: '/:movieId',
      method: HttpMethod.Delete,
      handler: this.delete,
      middlewares: [
        new ValidateObjectIdMiddleware('movieId'),
        new DocumentExistsMiddleware(this.movieService, 'Movie', 'movieId')
      ]
    });
    this.addRoute({
      path: '/:movieId',
      method: HttpMethod.Patch,
      handler: this.update,
      middlewares: [
        new ValidateObjectIdMiddleware('movieId'),
        new ValidateDtoMiddleware(UpdateMovieDto),
        new DocumentExistsMiddleware(this.movieService, 'Movie', 'movieId')
      ]
    });

    this.addRoute({
      path: '/genre/:genre',
      method: HttpMethod.Get,
      handler: this.getMoviesFromGenre,
      middlewares:[new ValidateGenreMiddleware('genre')]});

    this.addRoute({
      path: '/:movieId/comments',
      method: HttpMethod.Get,
      handler: this.getComments,
      middlewares: [
        new ValidateObjectIdMiddleware('movieId'),
        new DocumentExistsMiddleware(this.movieService, 'Movie', 'movieId')
      ]
    });
  }

  public async index(_req: Request<unknown, unknown, unknown, RequestQuery>, res: Response): Promise<void> {
    const movies = await this.movieService.find(_req.query.limit);
    const moviesToResponse = fillDTO(MoviesRdo, movies);
    this.ok(res, moviesToResponse);
  }

  public async create(
    { body }: Request<Record<string, unknown>, Record<string, unknown>, CreateMovieDto>,
    res: Response
  ): Promise<void> {
    const result = await this.movieService.create(body);
    this.created(res, fillDTO(MovieRdo, result));
  }

  public async show(
    {params}: Request<core.ParamsDictionary | ParamsGetMovie>,
    res: Response
  ): Promise<void> {
    const {movieId} = params;
    const movie = await this.movieService.findById(movieId);
    const movieToResponse = fillDTO(MovieRdo, movie);
    this.ok(res, movieToResponse);

  }

  public async delete(
    {params}: Request<core.ParamsDictionary | ParamsGetMovie>,
    res: Response
  ): Promise<void> {
    const {movieId} = params;
    const movie = await this.movieService.deleteById(movieId);
    this.noContent(res, movie);
  }

  public async update(
    {body, params}: Request<core.ParamsDictionary | ParamsGetMovie, Record<string, unknown>, UpdateMovieDto>,
    res: Response
  ): Promise<void> {
    const updatedMovie = await this.movieService.updateById(params.movieId, body);
    this.ok(res, fillDTO(MovieRdo, updatedMovie));
  }

  public async getMoviesFromGenre(
    {params, query}: Request<core.ParamsDictionary | ParamsGetGenre, unknown, unknown, RequestQuery>,
    res: Response
  ): Promise<void> {
    const movies = await this.movieService.findByGenre(params.genre, query.limit);
    const moviesToResponse = fillDTO(MoviesRdo, movies);
    this.ok(res, moviesToResponse);
  }

  public async getComments(
    {params}: Request<core.ParamsDictionary | ParamsGetMovie, object, object>,
    res: Response
  ): Promise<void> {
    const comments = await this.commentService.findByMovieId(params.movieId);
    this.ok(res, fillDTO(CommentRdo, comments));
  }

}
