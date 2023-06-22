import { NextFunction, Request, Response } from 'express';
import { MiddlewareInterface } from '../../types/middleware.interface';
import { MatchMovieUserInterface } from '../../types/matchMovieUser.interface';
import { StatusCodes } from 'http-status-codes';
import HttpError from '../errors/http-error.js';

export class AccessRightsMiddleware implements MiddlewareInterface {
  constructor(
    private param: string,
    private service: MatchMovieUserInterface,
  ) { }

  public async execute(_req: Request, _res: Response, next: NextFunction) {
    const movieId = _req.params[this.param];

    if (!await this.service.matchMovieUser(movieId, _req.user.id)) {
      throw new HttpError(
        StatusCodes.FORBIDDEN,
        'Access Denied',
        'AccessRightsMiddleware'
      );
    }
    return next();
  }

}
