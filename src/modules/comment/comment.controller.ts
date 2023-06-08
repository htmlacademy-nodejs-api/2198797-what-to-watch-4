import {Request, Response} from 'express';
import {inject} from 'inversify';
import {StatusCodes} from 'http-status-codes';
import { Controller } from '../../core/controller/controller.abstract.js';
import { LoggerInterface } from '../../core/logger/logger.interface';
import { CommentServiceInterface } from './comment-service.interface';
import CreateCommentDto from './dto/create-comment.dto.js';
import { MovieServiceInterface } from '../movie/movie-service.interface';
import HttpError from '../../core/errors/http-error.js';
import { HttpMethod } from '../../types/http-method.enum.js';
import { fillDTO } from '../../core/helpers/common.js';
import CommentRdo from './rdo/comment.rdo.js';
import { AppComponent } from '../../types/app-component.enum.js';
import { ValidateDtoMiddleware } from '../../core/middlewares/validate-dto.middleware.js';


export default class CommentController extends Controller{
  constructor(
        @inject(AppComponent.LoggerInterface) logger: LoggerInterface,
        @inject(AppComponent.CommentServiceInterface) private readonly commentService: CommentServiceInterface,
        @inject(AppComponent.MovieServiceInterface) private readonly movieService: MovieServiceInterface,
  ) {
    super(logger);

    this.logger.info('Register routes for CommentController…');
    this.addRoute({
      path: '/',
      method: HttpMethod.Post,
      handler: this.create,
      middlewares: [new ValidateDtoMiddleware(CreateCommentDto)]});
  }

  public async create(
    {body}: Request<object, object, CreateCommentDto>,
    res: Response
  ): Promise<void> {

    if (!await this.movieService.exists(body.movieId)) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `Movie with id ${body.movieId} not found.`,
        'CommentController'
      );
    }

    const comment = await this.commentService.create(body);
    await this.movieService.incCommentCount(body.movieId);
    this.created(res, fillDTO(CommentRdo, comment));
  }
}
