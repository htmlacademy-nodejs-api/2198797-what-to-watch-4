import { inject, injectable } from 'inversify';
import CreateMovieDto from './dto/create-movie.dto';
import { DocumentType, types } from '@typegoose/typegoose';
import { MovieEntity } from './movie.entity';
import { AppComponent } from '../../types/app-component.enum.js';
import { LoggerInterface } from '../../core/logger/logger.interface';
import { MovieServiceInterface } from './movie-service.interface';
import {DEFAULT_MOVIE_COUNT} from './movie.constants';
import UpdateMovieDto from './dto/update-movie.dto.js';

@injectable()
export default class MovieService implements MovieServiceInterface{
  constructor(
        @inject(AppComponent.LoggerInterface) private readonly logger: LoggerInterface,
        @inject(AppComponent.MovieModel) private readonly movieModel: types.ModelType<MovieEntity>
  ){}

  public async create(dto: CreateMovieDto): Promise<DocumentType<MovieEntity>>{
    const result = await this.movieModel.create(dto);
    this.logger.info(`New movie created: ${dto.name}`);

    return result;
  }

  public async findById(movieId: string): Promise<DocumentType<MovieEntity> | null> {
    return this.movieModel
      .findById(movieId)
      .populate('userId')
      .exec();
  }

  public async find(count?: number): Promise<DocumentType<MovieEntity>[]> {
    const limit = count ?? DEFAULT_MOVIE_COUNT;

    return this.movieModel
      .find()
      .populate('userId')
      .limit(limit)
      .exec();
  }

  public async findByGenre(genre: string, count?: number): Promise<DocumentType<MovieEntity>[] | null>{
    const limit = count ?? DEFAULT_MOVIE_COUNT;

    return this.movieModel
      .find({genre: genre}, {}, {limit})
      .populate('userId')
      .limit(limit)
      .exec();
  }

  public async deleteById(movieId: string): Promise<DocumentType<MovieEntity> | null> {
    return this.movieModel
      .findByIdAndDelete(movieId)
      .exec();
  }

  public async updateById(movieId: string, dto: UpdateMovieDto): Promise<DocumentType<MovieEntity> | null> {
    return this.movieModel
      .findByIdAndUpdate(movieId, dto, {new: true})
      .populate('userId')
      .exec();
  }

  public async incCommentCount(movieId: string): Promise<DocumentType<MovieEntity> | null> {
    return this.movieModel
      .findByIdAndUpdate(movieId, {'$inc': {
        commentCount: 1,
      }}).exec();
  }

}
